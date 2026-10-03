import sys
import time


def generation_test(nb):
    """python3 lancer.py --test 5 : génère nb leads en ligne de commande et affiche le résultat et le coût."""
    from .serveur import construire_profil_si_besoin  # charge aussi le .env
    from . import db
    from .generation import generation

    construire_profil_si_besoin()
    avant = db.consommation_du_jour()
    generation.lancer(nb)
    vus = 0
    while True:
        g = generation.lire()
        for ligne in g.get("journal", [])[vus:]:
            print(ligne)
        vus = len(g.get("journal", []))
        if not g.get("en_cours"):
            break
        time.sleep(1)
    apres = db.consommation_du_jour()
    print("\n" + "=" * 70)
    if g.get("erreur"):
        print("Arrêt :", g["erreur"])
    print(f"Ajoutés : {g['ajoutes']} · écartés : {g['ecartes']} · à compléter : {g['a_completer']}")
    print(f"Coût du lot : {apres['cout'] - avant['cout']:.2f} $ · appels API : {apres['appels'] - avant['appels']}"
          f" · recherches web : {apres['recherches'] - avant['recherches']}")
    for l in [x for x in db.leads() if x["cree_le"] >= g.get("debut", "")]:
        print("\n" + "-" * 70)
        print(f"{l['nom']} · {l['commune']} · {l['naf_libelle']} · score {l['score']}")
        print(f"Dirigeant : {l['dirigeant_nom']} ({l['dirigeant_poste']})  source : {l['dirigeant_source']}")
        print(f"Justification : {l['justification']}")
        for f in l["taches"] + l["signaux"]:
            print(f"  · {f['fait']}  [{f['source']}]")
        print(f"\nInvitation ({len(l['invitation'] or '')} car.) :\n{l['invitation'] or '(à compléter)'}\n  source : {l['invitation_source']}")
        print(f"\nMessage de suivi ({len(l['message_suivi'] or '')} car.) :\n{l['message_suivi'] or '(à compléter)'}\n  source : {l['suivi_source']}")


if "--test" in sys.argv:
    i = sys.argv.index("--test")
    nb = int(sys.argv[i + 1]) if len(sys.argv) > i + 1 and sys.argv[i + 1].isdigit() else 5
    generation_test(nb)
else:
    from .serveur import demarrer

    demarrer(ouvrir="--sans-navigateur" not in sys.argv)
