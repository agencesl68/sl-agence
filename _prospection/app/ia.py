"""Appels à l'API Anthropic : recherche web sur une entreprise, analyse, écriture des messages.

Chaque appel est compté (tokens, recherches web, coût) et bloqué si le plafond du jour est atteint.
"""
import json
import os
import re
import unicodedata
from urllib.parse import urlsplit

import anthropic

from . import db

# Tarifs en dollars (par million de tokens ; recherche web : par recherche).
TARIFS = {
    "claude-sonnet-5-5": {"entree": 2.0, "sortie": 10.0, "cache_lu": 0.20, "cache_ecrit": 2.50},
    "claude-sonnet-5": {"entree": 2.0, "sortie": 10.0, "cache_lu": 0.20, "cache_ecrit": 2.50},
    "claude-opus-5-5": {"entree": 4.0, "sortie": 20.0, "cache_lu": 0.20, "cache_ecrit": 5.0},
    "claude-haiku-4-5": {"entree": 1.0, "sortie": 5.0, "cache_lu": 0.10, "cache_ecrit": 1.25},
}
PRIX_RECHERCHE_WEB = 0.01
BETA_REPLI = "server-side-fallback-2026-07-01"

# Estimation prudente du coût d'une entreprise (recherche + analyse), pour le plafond.
ESTIMATION_PAR_ENTREPRISE = 0.30

MOTS_INTERDITS = [
    "workflow", "process", "ia générative", "intelligence artificielle générative",
    "solution innovante", "innovant", "révolutionn", "synergie", "booster", "game changer",
    "disrupt", "n'hésitez pas", "levier",
]


class ErreurIA(Exception):
    pass


class PlafondAtteint(ErreurIA):
    pass


_client = None


def client():
    global _client
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise ErreurIA(
            "Clé API Anthropic absente. Ajoutez ANTHROPIC_API_KEY=... dans le fichier .env puis relancez."
        )
    if _client is None:
        _client = anthropic.Anthropic(max_retries=3, timeout=300)
    return _client


def verifier_et_enregistrer_cle(cle, chemin_env):
    """Teste la clé (appel gratuit), puis l'écrit dans le fichier .env et l'active tout de suite."""
    global _client
    cle = (cle or "").strip().strip('"').strip("'")
    if not cle.startswith("sk-ant-") or len(cle) < 30 or any(c.isspace() for c in cle):
        raise ErreurIA("Ce texte ne ressemble pas à une clé API Anthropic (elle commence par sk-ant-).")
    try:
        anthropic.Anthropic(api_key=cle, max_retries=1, timeout=30).models.list(limit=1)
    except anthropic.AuthenticationError as e:
        raise ErreurIA("Anthropic refuse cette clé. Vérifiez que vous l'avez copiée en entier.") from e
    except anthropic.PermissionDeniedError as e:
        raise ErreurIA("Cette clé n'a pas les droits nécessaires. Créez-en une nouvelle.") from e
    except anthropic.APIConnectionError as e:
        raise ErreurIA("Impossible de joindre Anthropic. Vérifiez votre connexion internet.") from e
    except anthropic.APIStatusError as e:
        raise ErreurIA(f"Anthropic a répondu par une erreur ({e.status_code}). Réessayez dans un instant.") from e
    lignes = []
    if os.path.exists(chemin_env):
        with open(chemin_env, encoding="utf-8") as f:
            lignes = [l for l in f.read().splitlines() if not l.strip().startswith("ANTHROPIC_API_KEY")]
    lignes.append(f"ANTHROPIC_API_KEY={cle}")
    with open(chemin_env, "w", encoding="utf-8") as f:
        f.write("\n".join(lignes) + "\n")
    os.environ["ANTHROPIC_API_KEY"] = cle
    _client = None


def cle_presente():
    return bool(os.environ.get("ANTHROPIC_API_KEY"))


def verifier_plafond(estimation=0.0):
    r = db.reglages()
    conso = db.consommation_du_jour()
    if conso["cout"] + estimation > float(r["plafond_cout_jour"]):
        raise PlafondAtteint(
            f"Plafond du jour atteint ({conso['cout']:.2f} $ sur {float(r['plafond_cout_jour']):.2f} $). "
            "Vous pouvez le relever dans les Réglages."
        )


def cout_reponse(reponse):
    u = reponse.usage
    t = TARIFS.get(reponse.model) or TARIFS["claude-sonnet-5-5"]
    entree = u.input_tokens or 0
    sortie = u.output_tokens or 0
    lu = getattr(u, "cache_read_input_tokens", 0) or 0
    ecrit = getattr(u, "cache_creation_input_tokens", 0) or 0
    stu = getattr(u, "server_tool_use", None)
    recherches = (getattr(stu, "web_search_requests", 0) or 0) if stu else 0
    cout = (
        entree * t["entree"] + sortie * t["sortie"] + lu * t["cache_lu"] + ecrit * t["cache_ecrit"]
    ) / 1_000_000 + recherches * PRIX_RECHERCHE_WEB
    return entree, sortie, lu + ecrit, recherches, cout


def appel(usage, estimation=0.05, **kwargs):
    """Un appel Messages API, avec repli automatique côté serveur en cas de refus, et comptage du coût."""
    verifier_plafond(estimation)
    modele = db.reglages()["modele"]
    try:
        reponse = client().beta.messages.create(
            model=modele,
            betas=[BETA_REPLI],
            fallbacks="default",
            **kwargs,
        )
    except anthropic.AuthenticationError as e:
        raise ErreurIA("Clé API Anthropic refusée. Vérifiez le fichier .env.") from e
    except anthropic.RateLimitError as e:
        raise ErreurIA("Limite de débit de l'API Anthropic atteinte. Réessayez dans quelques minutes.") from e
    except anthropic.BadRequestError as e:
        raise ErreurIA(f"Requête refusée par l'API Anthropic : {e.message}") from e
    except anthropic.APIStatusError as e:
        raise ErreurIA(f"Erreur de l'API Anthropic ({e.status_code}).") from e
    except anthropic.APIConnectionError as e:
        raise ErreurIA("Connexion à l'API Anthropic impossible.") from e
    entree, sortie, cache, recherches, cout = cout_reponse(reponse)
    db.enregistrer_appel(usage, reponse.model, entree, sortie, cache, recherches, cout)
    if reponse.stop_reason == "refusal":
        raise ErreurIA("Le modèle a refusé de traiter cette demande.")
    return reponse


def texte_de(reponse):
    return "".join(b.text for b in reponse.content if getattr(b, "type", "") == "text").strip()


def json_de(reponse):
    texte = texte_de(reponse)
    try:
        return json.loads(texte)
    except ValueError:
        m = re.search(r"\{.*\}", texte, re.S)
        if m:
            try:
                return json.loads(m.group(0))
            except ValueError:
                pass
    raise ErreurIA("Réponse du modèle illisible (JSON attendu).")


def format_json(schema):
    return {"format": {"type": "json_schema", "schema": schema}}


def objet(proprietes):
    return {
        "type": "object",
        "properties": proprietes,
        "required": list(proprietes.keys()),
        "additionalProperties": False,
    }


TEXTE = {"type": "string"}
FAIT = objet({"fait": TEXTE, "source": TEXTE})


# ---------- Profil agence ----------

PREUVES_REELLES = [
    "Jusqu'à 20 heures récupérées par semaine chez un client",
    "Premier outil mis en place en 7 jours",
    "Devis sous 24 heures",
    "Appel découverte de 15 minutes, sans engagement",
]

REALISATIONS_REELLES = [
    "Une application qui centralise les dossiers clients d'un gestionnaire de patrimoine qui jonglait avec un fichier Excel par client",
    "Un bon d'épandage rempli et signé sur téléphone, au lieu d'être écrit à la main puis ressaisi au bureau",
    "Un suivi carburant avec photo du compteur et du ticket, au lieu de relevés papier",
]

PROFIL_PAR_DEFAUT = {
    "nom": "SL Agence",
    "expediteur": "Loïc, fondateur de SL Agence, consultant automatisation",
    "localisation": "Mulhouse (Haut-Rhin)",
    "offre": "Automatisation des tâches administratives et outils sur mesure pour les TPE et PME : "
    "on supprime la ressaisie, le papier et les fichiers Excel éparpillés.",
    "taches_supprimees": [
        "ressaisie de données d'un outil à l'autre",
        "devis et factures faits à la main, relances de factures et de devis",
        "bons d'intervention et rapports papier",
        "fichiers Excel multiples à tenir à jour",
        "plannings et prises de rendez-vous par téléphone",
        "relevés papier et formulaires PDF",
    ],
    "preuves": PREUVES_REELLES,
    "realisations": REALISATIONS_REELLES,
    "ton": "Direct, simple, concret, respectueux. Pas de jargon.",
    "cibles": ["dirigeants de TPE et PME de 1 à 50 salariés en Alsace"],
}

SCHEMA_PROFIL = objet({
    "offre": TEXTE,
    "taches_supprimees": {"type": "array", "items": TEXTE},
    "services": {"type": "array", "items": TEXTE},
    "ton": TEXTE,
    "cibles": {"type": "array", "items": TEXTE},
})


def synthese_profil(pages):
    """pages : liste de {url, titre, texte}. Retourne le profil agence (preuves réelles toujours incluses)."""
    corpus = "\n\n".join(f"### {p['url']}\n{p['titre']}\n{p['texte'][:6000]}" for p in pages)
    reponse = appel(
        "profil_agence",
        estimation=0.10,
        max_tokens=8000,
        output_config={"effort": "low", **format_json(SCHEMA_PROFIL)},
        messages=[{
            "role": "user",
            "content": (
                "Voici le contenu du site de SL Agence. Résume-le en français simple pour servir de "
                "référence à des messages de prospection : l'offre en 2 phrases, la liste des tâches "
                "que l'agence supprime chez ses clients, les services, le ton, les cibles. "
                "N'invente rien qui ne soit pas dans le texte. Ne nomme aucun client.\n\n" + corpus
            ),
        }],
    )
    donnees = json_de(reponse)
    profil = dict(PROFIL_PAR_DEFAUT)
    profil.update({k: v for k, v in donnees.items() if v})
    profil["preuves"] = PREUVES_REELLES
    profil["realisations"] = REALISATIONS_REELLES
    return profil


def profil_en_texte(profil):
    lignes = [
        f"Agence : {profil.get('nom', 'SL Agence')}, {profil.get('localisation', 'Mulhouse')}.",
        f"Expéditeur : {profil.get('expediteur')}.",
        f"Offre : {profil.get('offre')}",
        "Tâches que nous supprimons : " + "; ".join(profil.get("taches_supprimees", [])),
    ]
    if profil.get("services"):
        lignes.append("Services : " + "; ".join(profil["services"]))
    lignes.append("Preuves réelles (les seules autorisées) : " + "; ".join(profil.get("preuves", [])))
    lignes.append(
        "Réalisations (à citer sans jamais nommer le client) : " + "; ".join(profil.get("realisations", []))
    )
    lignes.append(f"Ton : {profil.get('ton')}")
    return "\n".join(lignes)


# ---------- Recherche web sur une entreprise ----------

def url_registre(siren):
    return f"https://annuaire-entreprises.data.gouv.fr/entreprise/{siren}"


def fiche_registre(e):
    dirigeant = e.get("dirigeant") or {}
    return (
        f"Nom : {e['nom']}" + (f" (aussi : {e['nom_complet']})" if e.get("nom_complet") else "") + "\n"
        + (f"Enseignes : {', '.join(e['enseignes'])}\n" if e.get("enseignes") else "")
        + f"SIREN : {e['siren']}\n"
        f"Activité (NAF) : {e['naf']} {e['naf_libelle']}\n"
        f"Adresse du siège : {e['adresse']}\n"
        f"Date de création : {e.get('date_creation') or 'non trouvé'}\n"
        f"Tranche d'effectif : {e.get('tranche_libelle') or e.get('tranche')}\n"
        f"Dirigeant au registre : "
        + (f"{dirigeant.get('nom')} ({dirigeant.get('poste')})" if dirigeant else "non trouvé")
        + f"\nFiche publique du registre : {url_registre(e['siren'])}"
    )


SYSTEME_RECHERCHE = (
    "Tu es un assistant de recherche pour une agence d'automatisation basée à Mulhouse. "
    "Tu cherches sur le web des informations publiques et professionnelles sur une entreprise. "
    "Règles absolues : n'utilise jamais LinkedIn comme source, ne cherche aucune donnée personnelle "
    "(adresse privée, téléphone personnel, âge, vie privée). N'invente rien : chaque fait doit venir "
    "d'une page que tu as réellement trouvée, avec son URL exacte. Si tu ne trouves pas, écris "
    "\"non trouvé\". Attention aux homonymes : vérifie la ville et l'activité."
)

CONSIGNE_RECHERCHE = """Entreprise à étudier (données du registre public) :
{fiche}

Cherche, en quelques recherches ciblées :
1. Son site internet officiel et ce qu'elle fait vraiment (métier, clients, zone).
2. Des signes de tâches répétitives ou de papier : devis, bons d'intervention, plannings, relevés, saisies en double, prise de rendez-vous par téléphone, formulaires PDF à remplir, commandes par téléphone ou par mail, etc.
3. Des signaux de croissance ou de charge : offres d'emploi (surtout assistant(e) administratif(ve), secrétaire, comptable), nouvelle agence ou nouveau local, actualité récente, avis clients qui parlent de délais ou de difficultés à joindre l'entreprise.
4. Le nom et le poste du dirigeant (confirme ou corrige le registre).

Réponds en français avec ce plan, une ligne par fait, chaque fait suivi de son URL source :
SITE : ... | URL
ACTIVITÉ : ... | URL
DIRIGEANT : nom, poste | URL
TÂCHES RÉPÉTITIVES :
- fait précis | URL
SIGNAUX DE CROISSANCE OU DE CHARGE :
- fait précis | URL
Écris "non trouvé" pour toute rubrique sans information vérifiée."""


def _normaliser_url(u):
    if not u:
        return ""
    try:
        p = urlsplit(u.strip())
    except ValueError:
        return ""
    hote = p.netloc.lower().removeprefix("www.")
    chemin = p.path.rstrip("/")
    return f"{hote}{chemin}"


def urls_vues(reponses):
    vues = set()
    for reponse in reponses:
        for bloc in reponse.content:
            t = getattr(bloc, "type", "")
            if t == "web_search_tool_result":
                contenu = getattr(bloc, "content", None)
                if isinstance(contenu, list):
                    for r in contenu:
                        if getattr(r, "url", None):
                            vues.add(r.url)
            elif t == "text":
                for c in getattr(bloc, "citations", None) or []:
                    if getattr(c, "url", None):
                        vues.add(c.url)
    return vues


def rechercher(e):
    """Recherche web sur une entreprise. Retourne (rapport texte, ensemble des URL réellement consultées)."""
    r = db.reglages()
    messages = [{"role": "user", "content": CONSIGNE_RECHERCHE.format(fiche=fiche_registre(e))}]
    outils = [{
        "type": "web_search_20260209",
        "name": "web_search",
        "max_uses": int(r["recherches_web_max"]),
        "blocked_domains": ["linkedin.com"],
        "user_location": {
            "type": "approximate", "city": "Mulhouse", "region": "Grand Est",
            "country": "FR", "timezone": "Europe/Paris",
        },
    }]
    reponses = []
    for _ in range(3):  # reprise si le serveur met le tour en pause
        reponse = appel(
            "recherche_web",
            estimation=0.20,
            max_tokens=16000,
            system=SYSTEME_RECHERCHE,
            tools=outils,
            output_config={"effort": "medium"},
            messages=messages,
        )
        reponses.append(reponse)
        if reponse.stop_reason != "pause_turn":
            break
        messages = messages + [{"role": "assistant", "content": reponse.content}]
    rapport = texte_de(reponses[-1])
    if not rapport:
        raise ErreurIA("La recherche web n'a rien renvoyé.")
    return rapport, urls_vues(reponses)


# ---------- Analyse, note et messages ----------

REGLES_ECRITURE = """Règles d'écriture (toutes obligatoires) :
- Français simple, vouvoiement, ton direct et respectueux, pour un dirigeant. Commence par "Bonjour" suivi du prénom et du nom (jamais Monsieur ou Madame, on ne devine pas).
- Chaque message cite au moins un élément précis et vérifié sur l'entreprise, tiré des faits fournis, avec son URL source.
- Relie cet élément à une tâche concrète qu'on pourrait supprimer, et à du temps gagné.
- Interdits : tirets longs (— ou –), emojis, jargon ("workflow", "process", "IA générative", "solution innovante", "levier", "booster"), flatterie creuse ("bravo pour votre superbe entreprise"), formules de vendeur ("offre exclusive", "n'hésitez pas").
- N'invente aucun chiffre ni aucune preuve : utilise uniquement les preuves réelles de l'agence.
- Ne nomme jamais un client de l'agence.
- Invitation LinkedIn : 300 caractères maximum, espaces compris. Elle ne vend rien : elle crée le lien (pourquoi vous vous connectez à cette personne en particulier). Pas de lien, pas de signature longue.
- Message de suivi (après acceptation) : 600 caractères maximum. Il remercie brièvement, cite l'élément, explique en une phrase ce qu'on pourrait supprimer et le temps gagné (une réalisation proche peut servir d'exemple), puis propose un appel découverte de 15 minutes. Signé "Loïc"."""

CRITERES = """Note à attribuer (le reste de la note est calculé automatiquement) :
- note_taches (0 à 35) : volume probable de tâches administratives répétitives dans ce métier et dans cette entreprise (devis, bons, plannings, relevés, ressaisies, rendez-vous, papier). C'est le critère le plus important.
- note_signaux (0 à 20) : signaux concrets trouvés et sourcés (recrutement administratif, papier visible, croissance, avis sur les délais). 0 si rien de concret.
La justification fait 2 ou 3 phrases, factuelles, sans formule commerciale."""

SCHEMA_ANALYSE = objet({
    "site_web": objet({"valeur": TEXTE, "source": TEXTE}),
    "activite": objet({"valeur": TEXTE, "source": TEXTE}),
    "dirigeant": objet({"nom": TEXTE, "poste": TEXTE, "source": TEXTE}),
    "taches": {"type": "array", "items": FAIT},
    "signaux": {"type": "array", "items": FAIT},
    "note_taches": {"type": "integer"},
    "note_signaux": {"type": "integer"},
    "justification": TEXTE,
    "invitation": objet({"texte": TEXTE, "element": TEXTE, "source": TEXTE}),
    "suivi": objet({"texte": TEXTE, "element": TEXTE, "source": TEXTE}),
})

SCHEMA_MESSAGE = objet({"texte": TEXTE, "element": TEXTE, "source": TEXTE})


def systeme_redaction(profil):
    return [{
        "type": "text",
        "text": (
            "Tu aides Loïc, fondateur de SL Agence (Mulhouse), consultant automatisation, à prospecter "
            "des dirigeants sur LinkedIn. Il envoie lui-même chaque message, à la main.\n\n"
            "PROFIL DE L'AGENCE\n" + profil_en_texte(profil) + "\n\n" + REGLES_ECRITURE
        ),
        "cache_control": {"type": "ephemeral"},
    }]


def analyser(e, rapport, profil):
    consigne = (
        "Données du registre public :\n" + fiche_registre(e) + "\n\n"
        "Rapport de recherche web :\n" + rapport + "\n\n"
        "1. Reprends uniquement les faits du rapport qui ont une URL source. Pour une information absente, "
        "mets \"non trouvé\" (et une source vide). Pour le dirigeant, l'URL du registre est une source valable.\n"
        "2. " + CRITERES + "\n"
        "3. Écris l'invitation LinkedIn et le message de suivi en respectant les règles. Pour chacun, "
        "indique l'élément précis cité et son URL source (une URL du rapport ou du registre).\n"
        "Si aucun fait précis n'a été trouvé, base les messages sur l'activité et la commune du registre, "
        "avec l'URL du registre comme source."
    )
    reponse = appel(
        "analyse_messages",
        estimation=0.06,
        max_tokens=8000,
        system=systeme_redaction(profil),
        output_config={"effort": "medium", **format_json(SCHEMA_ANALYSE)},
        messages=[{"role": "user", "content": consigne}],
    )
    return json_de(reponse)


EMOJI = re.compile(
    "[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF\U0001F900-\U0001F9FF️]"
)


def nettoyer(texte):
    t = (texte or "").strip()
    t = re.sub(r"\s*[—–]\s*", ", ", t)
    t = EMOJI.sub("", t)
    t = re.sub(r"[ \t]{2,}", " ", t)
    return t.strip()


def problemes(texte, limite):
    res = []
    if len(texte) > limite:
        res.append(f"le texte fait {len(texte)} caractères, il doit en faire {limite} au maximum")
    bas = unicodedata.normalize("NFC", texte.lower())
    for mot in MOTS_INTERDITS:
        if mot in bas:
            res.append(f"le mot « {mot} » est interdit")
    if re.search(r"\b(tu|toi|ton|ta|tes)\b", bas):
        res.append("il faut vouvoyer")
    return res


def corriger(e, nature, message, limite, profil, defauts):
    consigne = (
        f"Voici un {nature} pour {e['nom']} :\n\n{message['texte']}\n\n"
        f"Il pose ces problèmes : {'; '.join(defauts)}.\n"
        f"Réécris-le en corrigeant tout, en gardant le même élément cité ({message['element']}) "
        f"et la même source. {limite} caractères maximum."
    )
    reponse = appel(
        "correction_message",
        estimation=0.02,
        max_tokens=2000,
        system=systeme_redaction(profil),
        output_config={"effort": "low", **format_json(SCHEMA_MESSAGE)},
        messages=[{"role": "user", "content": consigne}],
    )
    return json_de(reponse)


def message_conforme(e, nature, message, limite, profil):
    """Nettoie, vérifie, et fait corriger une fois si besoin."""
    message = dict(message)
    message["texte"] = nettoyer(message.get("texte"))
    defauts = problemes(message["texte"], limite)
    if defauts:
        try:
            corrige = corriger(e, nature, message, limite, profil, defauts)
            corrige["texte"] = nettoyer(corrige.get("texte"))
            if len(problemes(corrige["texte"], limite)) < len(defauts):
                message = corrige
        except ErreurIA:
            pass
    return message


def reecrire(lead, nature, profil):
    """Nouvelle version de l'invitation ou du message de suivi."""
    limite = 300 if nature == "invitation" else 600
    ancien = lead["invitation"] if nature == "invitation" else lead["message_suivi"]
    libelle = "l'invitation LinkedIn" if nature == "invitation" else "le message de suivi"
    faits = "\n".join(
        f"- {f['fait']} | {f['source']}" for f in (lead.get("taches") or []) + (lead.get("signaux") or [])
    ) or "aucun fait précis"
    consigne = (
        f"Entreprise : {lead['nom']}, {lead.get('naf_libelle') or ''}, à {lead.get('commune') or ''}.\n"
        f"Dirigeant : {lead.get('dirigeant_nom') or 'non trouvé'} ({lead.get('dirigeant_poste') or ''}).\n"
        f"Activité : {lead.get('activite') or 'non trouvé'} | {lead.get('activite_source') or ''}\n"
        f"Site : {lead.get('site_web') or 'non trouvé'}\n"
        f"Faits vérifiés :\n{faits}\n"
        f"Registre : {url_registre(lead['siren'])}\n\n"
        f"Version actuelle de {libelle} :\n{ancien}\n\n"
        f"Écris une autre version de {libelle}, avec un angle ou un élément différent si possible. "
        f"{limite} caractères maximum. Indique l'élément cité et son URL source."
    )
    reponse = appel(
        "reecriture",
        estimation=0.02,
        max_tokens=3000,
        system=systeme_redaction(profil),
        output_config={"effort": "medium", **format_json(SCHEMA_MESSAGE)},
        messages=[{"role": "user", "content": consigne}],
    )
    message = json_de(reponse)
    fiche = {"nom": lead["nom"]}
    return message_conforme(fiche, libelle, message, limite, profil)


def relance(lead, profil):
    consigne = (
        f"Il y a plus de 7 jours, Loïc a envoyé ce message à {lead.get('dirigeant_nom') or 'ce dirigeant'} "
        f"({lead['nom']}, {lead.get('commune') or ''}) et n'a pas eu de réponse :\n\n{lead.get('message_suivi')}\n\n"
        "Écris une relance courte (400 caractères maximum), polie, sans pression ni reproche, "
        "qui apporte une idée concrète en plus (par exemple une réalisation proche, sans nommer le client) "
        "et repropose l'appel de 15 minutes, ou de simplement répondre non si ce n'est pas le moment. "
        "Indique l'élément cité et son URL source (reprends celle du message initial si besoin)."
    )
    reponse = appel(
        "relance",
        estimation=0.02,
        max_tokens=3000,
        system=systeme_redaction(profil),
        output_config={"effort": "medium", **format_json(SCHEMA_MESSAGE)},
        messages=[{"role": "user", "content": consigne}],
    )
    message = json_de(reponse)
    return message_conforme({"nom": lead["nom"]}, "message de relance", message, 400, profil)


# ---------- Vérification des sources ----------

def _hote(url):
    return _normaliser_url(url).split("/")[0]


def source_verifiee(url, vues, siren):
    """Vraie si l'URL fait partie des pages réellement renvoyées par la recherche web (ou du registre)."""
    if not url or not url.startswith("http"):
        return False
    n = _normaliser_url(url)
    if n == _normaliser_url(url_registre(siren)):
        return True
    if not vues:
        # Aucune URL n'a pu être relevée dans la réponse : on garde les liens tels quels.
        return True
    normalisees = {_normaliser_url(u) for u in vues}
    hotes = {_hote(u) for u in vues}
    return n in normalisees or _hote(url) in hotes


def filtrer_faits(faits, vues, siren):
    res = []
    for f in faits or []:
        fait = (f.get("fait") or "").strip()
        if not fait or fait.lower().startswith("non trouv"):
            continue
        if source_verifiee(f.get("source"), vues, siren):
            res.append({"fait": fait, "source": f["source"]})
    return res
