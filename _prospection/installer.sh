#!/bin/bash
# Installe (ou met à jour) la prospection SL Agence sur Mac, sans rien installer à la main.
# Usage, dans le Terminal :
#   curl -fsSL https://raw.githubusercontent.com/agencesl68/sl-agence/claude/eager-shannon-5we0ld/_prospection/installer.sh | bash
set -e

BRANCHE="${BRANCHE:-claude/eager-shannon-5we0ld}"
DOSSIER="$HOME/SL-Prospection"
LANCEUR="$HOME/Desktop/Prospection SL Agence.command"

echo ""
echo "  Installation de la prospection SL Agence"
echo "  (2 à 3 minutes la première fois)"
echo ""

# 1. uv : installe et gère Python tout seul.
UV="$(command -v uv || true)"
if [ -z "$UV" ] && [ -x "$HOME/.local/bin/uv" ]; then UV="$HOME/.local/bin/uv"; fi
if [ -z "$UV" ]; then
  echo "· Installation de l'outil Python (uv)..."
  curl -LsSf https://astral.sh/uv/install.sh | env UV_NO_MODIFY_PATH=1 sh >/dev/null
  UV="$HOME/.local/bin/uv"
fi
echo "· Préparation de Python..."
"$UV" python install 3.12 >/dev/null 2>&1 || true
PYTHON="$("$UV" python find 3.12)"

# 2. Téléchargement de l'application (le fichier .env et la base de données sont conservés).
echo "· Téléchargement de l'application..."
TMP="$(mktemp -d)"
curl -fsSL "https://github.com/agencesl68/sl-agence/archive/refs/heads/${BRANCHE}.zip" -o "$TMP/app.zip"
unzip -q "$TMP/app.zip" -d "$TMP"
SRC="$(find "$TMP" -maxdepth 2 -type d -name _prospection | head -1)"
mkdir -p "$DOSSIER"
cp -R "$SRC/." "$DOSSIER/"
rm -rf "$TMP"

# 3. Icône sur le Bureau.
mkdir -p "$(dirname "$LANCEUR")"
cat > "$LANCEUR" <<EOF
#!/bin/bash
# Double-cliquez pour ouvrir la prospection SL Agence. Laissez cette fenêtre ouverte pendant que vous travaillez.
cd "$DOSSIER"
"$PYTHON" lancer.py
EOF
chmod +x "$LANCEUR"

echo "· Installation des composants (une seule fois)..."
cd "$DOSSIER"
"$PYTHON" lancer.py --installer-seulement

echo ""
echo "  C'est installé."
echo "  Chaque matin : double-cliquez sur « Prospection SL Agence » sur votre Bureau."
echo ""

# 4. Premier lancement.
if command -v open >/dev/null 2>&1 && [ "${SANS_LANCEMENT:-}" != "1" ]; then
  open "$LANCEUR"
fi
