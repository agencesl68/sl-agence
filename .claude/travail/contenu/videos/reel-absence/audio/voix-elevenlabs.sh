#!/bin/bash
# Voix off du reel « salarié absent » générée avec ElevenLabs, sur l'ordinateur de Loïc.
# La clé API est demandée en saisie masquée : elle ne quitte jamais l'ordinateur et n'est écrite nulle part.
# Résultat : 7 fichiers (1.mp3 … 7.mp3) dans le dossier « voix-off-sl » du Bureau, à renvoyer au Manager.

VOICE_ID="${VOICE_ID:-}"
MODELE="eleven_multilingual_v2"
DOSSIER="$HOME/Desktop/voix-off-sl"

if [ -z "$VOICE_ID" ]; then read -r -p "ID de la voix ElevenLabs : " VOICE_ID; fi
if [ -z "$ELEVENLABS_API_KEY" ]; then read -r -s -p "Clé API ElevenLabs (rien ne s'affiche, c'est normal) : " ELEVENLABS_API_KEY; echo; fi
mkdir -p "$DOSSIER"

dire() {
  local n="$1" texte="$2"
  printf '  segment %s… ' "$n"
  code=$(curl -s -o "$DOSSIER/$n.mp3" -w "%{http_code}" \
    -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID?output_format=mp3_44100_192" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" \
    --data-binary @- <<JSON
{"text": "$texte", "model_id": "$MODELE",
 "voice_settings": {"stability": 0.55, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": true, "speed": 1.0}}
JSON
)
  if [ "$code" = "200" ]; then echo "ok"; else echo "ERREUR $code"; cat "$DOSSIER/$n.mp3"; echo; rm -f "$DOSSIER/$n.mp3"; fi
}

dire 1 "Thomas est absent. Et là, tout se complique."
dire 2 "Un client attend une réponse. Vous cherchez partout... Rien."
dire 3 "Le problème n'est pas Thomas. C'est l'information éparpillée."
dire 4 "Maintenant, imaginez l'inverse."
dire 5 "Vous tapez le nom du client. Le dossier s'ouvre, même si Thomas est absent aujourd'hui."
dire 6 "Le travail continue, tout simplement."
dire 7 "S L agence, point F R."

unset ELEVENLABS_API_KEY
echo "Terminé : $DOSSIER"
open "$DOSSIER" 2>/dev/null || true
