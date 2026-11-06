"""Cale la voix off de Loïc sur le reel et baisse la musique sous la voix.

Mettre les enregistrements dans voix-off/ (n'importe quel format audio : m4a, mp3, wav…) :
  - soit un fichier par segment : 1.m4a, 2.m4a … 7.m4a (placés aux repères de src/timeline.json → "voix")
  - soit une seule prise : prise.m4a, enregistrée en regardant la vidéo depuis 0:00
Puis : python3 audio/mixer-voix.py   →   out/reel-sl-agence-absence-voix.mp4
Options : --decalage 0.2 (avance/retarde toute la voix, en secondes)
"""
import glob
import json
import os
import subprocess
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RACINE)
L = json.load(open("src/timeline.json"))
DUREE = L["duree"] / L["fps"]
DEBUTS = L["voix"]["segments"]
decalage = float(sys.argv[sys.argv.index("--decalage") + 1]) if "--decalage" in sys.argv else 0.0

VIDEO = "out/reel-sl-agence-absence.mp4"
MUSIQUE = "public/audio/bande-son.wav"
SORTIE = "out/reel-sl-agence-absence-voix.mp4"
TMP = "out/apercus/voix"
os.makedirs(TMP, exist_ok=True)


def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def duree(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True)
    return float(r.stdout.strip())


# nettoyage voix : coupe les silences de début et de fin, grave et souffle retirés, voix régulière
NETTOYAGE = (
    "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
    "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse,"
    "highpass=f=85,lowpass=f=13000,afftdn=nf=-30,"
    "acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=2,"
    "aresample=48000,aformat=channel_layouts=stereo"
)

# une prise entière garde ses silences (ils portent le calage)
NETTOYAGE_PRISE = NETTOYAGE.split("areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse,")[1]

fichiers = {}
for f in glob.glob("voix-off/*"):
    nom = os.path.splitext(os.path.basename(f))[0].lower()
    fichiers[nom] = f

morceaux = []  # (fichier nettoyé, début en s)
if "prise" in fichiers:
    ff("-i", fichiers["prise"], "-af", NETTOYAGE_PRISE, f"{TMP}/prise.wav")
    morceaux.append((f"{TMP}/prise.wav", 0.0))
else:
    for i, debut in enumerate(DEBUTS, start=1):
        if str(i) not in fichiers:
            print(f"  segment {i} : pas de fichier (voix-off/{i}.m4a), ignoré")
            continue
        sortie = f"{TMP}/{i}.wav"
        ff("-i", fichiers[str(i)], "-af", NETTOYAGE, sortie)
        d = duree(sortie)
        fin = DEBUTS[i] if i < len(DEBUTS) else DUREE - 0.15
        place = fin - debut
        alerte = "" if d <= place + 0.15 else f"  ⚠ trop long de {d - place:.1f} s (déborde sur le segment suivant)"
        print(f"  segment {i} : {d:.1f} s pour {place:.1f} s disponibles{alerte}")
        morceaux.append((sortie, debut))

if not morceaux:
    sys.exit("Aucun enregistrement trouvé dans voix-off/ (1.m4a … 7.m4a ou prise.m4a).")

# piste voix complète
entrees, filtres = [], []
for k, (f, debut) in enumerate(morceaux):
    entrees += ["-i", f]
    ms = max(0, int((debut + decalage) * 1000))
    filtres.append(f"[{k}:a]adelay={ms}|{ms}[v{k}]")
n = len(morceaux)
filtres.append("".join(f"[v{k}]" for k in range(n)) + f"amix=inputs={n}:normalize=0,apad,atrim=0:{DUREE},loudnorm=I=-16:TP=-2:LRA=7[voix]")
ff(*entrees, "-filter_complex", ";".join(filtres), "-map", "[voix]", "-ar", "48000", f"{TMP}/voix.wav")

# musique baissée sous la voix (la musique s'efface quand Loïc parle) puis mixage final
ff("-i", MUSIQUE, "-i", f"{TMP}/voix.wav", "-filter_complex",
   "[0:a]volume=-4dB[m];[1:a]asplit=2[v1][v2];"
   "[m][v1]sidechaincompress=threshold=0.015:ratio=8:attack=25:release=350:makeup=1[md];"
   "[md][v2]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000[a]",
   "-map", "[a]", f"{TMP}/mix.wav")
ff("-i", VIDEO, "-i", f"{TMP}/mix.wav", "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
   "-shortest", "-movflags", "+faststart", SORTIE)
print("écrit", SORTIE)
