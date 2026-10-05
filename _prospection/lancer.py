#!/usr/bin/env python3
"""Lance l'application de prospection SL Agence : python3 lancer.py

Au premier lancement, installe ce qu'il faut dans un dossier .venv (une à deux minutes).
"""
import hashlib
import os
import shutil
import subprocess
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
VENV = os.path.join(ICI, ".venv")
REQ = os.path.join(ICI, "requirements.txt")
WINDOWS = os.name == "nt"
PY = os.path.join(VENV, "Scripts" if WINDOWS else "bin", "python.exe" if WINDOWS else "python")


def empreinte():
    with open(REQ, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()


def preparer():
    if sys.version_info < (3, 10):
        sys.exit("Python 3.10 ou plus récent est nécessaire (https://www.python.org/downloads/).")
    if not os.path.exists(PY):
        print("Premier lancement : préparation de l'environnement...")
        subprocess.check_call([sys.executable, "-m", "venv", VENV])
    marque = os.path.join(VENV, ".installe")
    deja = open(marque).read().strip() if os.path.exists(marque) else ""
    if deja != empreinte():
        print("Installation des composants...")
        subprocess.check_call([PY, "-m", "pip", "install", "-q", "--upgrade", "pip"])
        subprocess.check_call([PY, "-m", "pip", "install", "-q", "-r", REQ])
        with open(marque, "w") as f:
            f.write(empreinte())
    env = os.path.join(ICI, ".env")
    if not os.path.exists(env):
        shutil.copy(os.path.join(ICI, ".env.exemple"), env)
        print("La clé API Anthropic se colle directement dans l'application.")


if __name__ == "__main__":
    preparer()
    if "--installer-seulement" in sys.argv:
        sys.exit(0)
    os.chdir(ICI)
    try:
        sys.exit(subprocess.call([PY, "-m", "app", *sys.argv[1:]]))
    except KeyboardInterrupt:
        pass
