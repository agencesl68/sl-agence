"""Bande-son originale du reel (musique + bruitages), 100 % synthétisée : aucun droit tiers.

Lit src/timeline.json (mêmes repères que l'animation) et écrit public/audio/bande-son.wav.
Usage : python3 audio/generer-audio.py
"""
import json
import os
import wave

import numpy as np

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
L = json.load(open(os.path.join(RACINE, "src", "timeline.json")))
SR = 48000
FPS = L["fps"]
DUREE = L["duree"] / FPS
N = int(DUREE * SR)
rng = np.random.default_rng(7)


def sec(img):
    return img / FPS


def tt(d):
    return np.arange(int(d * SR)) / SR


def env(n, a, r, courbe=4.0):
    """Enveloppe attaque linéaire / déclin exponentiel (en secondes)."""
    x = np.arange(n) / SR
    e = np.minimum(1.0, x / max(a, 1e-4))
    return e * np.exp(-courbe * np.maximum(0, x - a) / max(r, 1e-4))


def passe_bas(x, fc):
    """Filtre passe-bas à un pôle (fc peut varier dans le temps)."""
    fc = np.broadcast_to(np.asarray(fc, dtype=float), x.shape)
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        y[i] = acc
    return y


def passe_bas_fft(x, fc):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X, len(x))


def passe_haut_fft(x, fc):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (fc / np.maximum(f, 1)) ** 4)
    return np.fft.irfft(X, len(x))


def reverb(x, duree=2.2, mix=0.3, clair=6000):
    n = int(duree * SR)
    ir = rng.standard_normal(n) * np.exp(-6.0 * np.arange(n) / n)
    ir = passe_bas_fft(ir, clair)
    ir /= np.sqrt(np.sum(ir ** 2))
    m = len(x) + n
    taille = 1 << (m - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, taille) * np.fft.rfft(ir, taille), taille)[: len(x)]
    return (1 - mix) * x + mix * y * 0.6


def note(f):
    return 440.0 * 2 ** ((f - 69) / 12)


def ajoute(piste, son, t0, gain=1.0):
    i = int(t0 * SR)
    if i >= len(piste):
        return
    son = son[: len(piste) - i]
    piste[i : i + len(son)] += son * gain


# ---------------------------------------------------------------- bruitages
def s_clic():
    n = int(0.03 * SR)
    return passe_haut_fft(rng.standard_normal(n), 2500) * env(n, 0.0005, 0.008) * 0.5


def s_pop():
    t = tt(0.18)
    return np.sin(2 * np.pi * (300 + 500 * np.exp(-t * 40)) * t) * env(len(t), 0.002, 0.06) * 0.5


def s_notification():
    t = tt(0.7)
    a = np.sin(2 * np.pi * note(84) * t) * env(len(t), 0.003, 0.25)
    b = np.zeros_like(t)
    k = int(0.09 * SR)
    b[k:] = np.sin(2 * np.pi * note(91) * t[: len(t) - k]) * env(len(t) - k, 0.003, 0.35)
    return (a + b) * 0.28


def s_impact():
    t = tt(1.2)
    corps = np.sin(2 * np.pi * (40 + 90 * np.exp(-t * 18)) * t) * env(len(t), 0.002, 0.35) * 0.5
    claque = passe_bas_fft(rng.standard_normal(len(t)), 3500) * env(len(t), 0.001, 0.05) * 0.5
    return corps + claque


def s_souffle(d=0.6, montee=True):
    n = int(d * SR)
    x = rng.standard_normal(n)
    k = np.linspace(0, 1, n)
    fc = 300 + 4000 * (k if montee else 1 - k) ** 2
    forme = np.sin(np.pi * k) ** 2
    return passe_bas(x, fc) * forme * 0.35


def s_dispersion():
    out = np.zeros(int(0.8 * SR))
    for i in range(6):
        w = s_souffle(0.35 + 0.05 * i, montee=i % 2 == 0) * 0.6
        ajoute(out, w, 0.03 * i)
    return out


def s_frappe(nb_images):
    d = sec(nb_images) + 0.05
    out = np.zeros(int(d * SR))
    pas = 1.1 / FPS
    k = 0.0
    while k < sec(nb_images):
        ajoute(out, s_clic() * (0.6 + 0.4 * rng.random()), k)
        k += pas * (0.8 + 0.4 * rng.random())
    return out


def s_erreur():
    t = tt(0.45)
    a = np.sin(2 * np.pi * 220 * t) + 0.3 * np.sin(2 * np.pi * 440 * t)
    e = env(len(t), 0.004, 0.12)
    e2 = np.zeros_like(e)
    k = int(0.13 * SR)
    e2[k:] = env(len(t) - k, 0.004, 0.14)
    b = np.sin(2 * np.pi * 185 * t) + 0.3 * np.sin(2 * np.pi * 370 * t)
    return (a * e + b * e2) * 0.18


def s_fenetre():
    t = tt(0.25)
    return (s_souffle(0.25) * 0.5 + np.sin(2 * np.pi * (500 - 300 * t / 0.25) * t) * env(len(t), 0.002, 0.07) * 0.15)


def s_coupure():
    t = tt(0.3)
    zap = np.sin(2 * np.pi * (1800 * np.exp(-t * 25) + 120) * t) * env(len(t), 0.001, 0.07) * 0.2
    return zap + passe_haut_fft(rng.standard_normal(len(t)), 4000) * env(len(t), 0.001, 0.02) * 0.15


def s_deconnexion():
    t = tt(0.9)
    return np.sin(2 * np.pi * (330 * np.exp(-t * 3)) * t) * env(len(t), 0.005, 0.4) * 0.3


def s_question():
    t = tt(0.8)
    return np.sin(2 * np.pi * note(76) * t) * env(len(t), 0.01, 0.4) * 0.12


def s_impulsion():
    t = tt(1.6)
    sub = np.sin(2 * np.pi * (55 + 30 * np.exp(-t * 6)) * t) * env(len(t), 0.004, 0.7) * 0.4
    nappe = sum(np.sin(2 * np.pi * note(m) * t) for m in (62, 69, 74)) * env(len(t), 0.02, 0.9) * 0.06
    return sub + nappe


def s_aspiration():
    d = sec(L["musique"]["apaisee_debut"] - 400)
    n = int(d * SR)
    k = np.linspace(0, 1, n)
    x = passe_bas(rng.standard_normal(n), 200 + 7000 * k ** 2.5) * k ** 2 * 0.45
    t = np.arange(n) / SR
    phase = 2 * np.pi * np.cumsum(180 + 700 * k ** 2) / SR
    return x + np.sin(phase) * k ** 3 * 0.08


def s_fusion():
    t = tt(2.6)
    boom = np.sin(2 * np.pi * (45 + 70 * np.exp(-t * 14)) * t) * env(len(t), 0.002, 0.6) * 0.45
    accord = sum(np.sin(2 * np.pi * note(m) * t) * (0.5 if m > 80 else 1) for m in (62, 66, 69, 73, 78, 85))
    return boom + accord * env(len(t), 0.004, 1.3, 3) * 0.05


def s_succes():
    out = np.zeros(int(0.8 * SR))
    for i, m in enumerate((79, 83, 86)):
        t = tt(0.6)
        ajoute(out, (np.sin(2 * np.pi * note(m) * t) + 0.2 * np.sin(4 * np.pi * note(m) * t)) * env(len(t), 0.002, 0.25), 0.055 * i, 0.16)
    return out


def s_ouverture():
    return s_souffle(0.4, montee=True) * 0.6


def s_validation():
    out = np.zeros(int(1.0 * SR))
    for i, m in enumerate((86, 91)):
        t = tt(0.8)
        ajoute(out, np.sin(2 * np.pi * note(m) * t) * env(len(t), 0.002, 0.35), 0.08 * i, 0.2)
    return out


def s_avance():
    return s_souffle(0.55, montee=True) * 0.8


def s_ligne():
    t = tt(0.9)
    k = np.linspace(0, 1, len(t))
    return passe_bas(rng.standard_normal(len(t)), 800 + 6000 * k) * np.sin(np.pi * k) * 0.18


def s_logo():
    t = tt(3.0)
    accord = sum(np.sin(2 * np.pi * note(m) * t) * g for m, g in ((50, 0.7), (62, 0.6), (66, 0.4), (69, 0.4), (74, 0.35), (78, 0.25)))
    cloche = np.sin(2 * np.pi * note(86) * t) * env(len(t), 0.002, 0.9) * 0.3
    return (accord * env(len(t), 0.01, 2.0, 2.5) * 0.12 + cloche * 0.4)


SONS = {
    "clic": s_clic, "pop": s_pop, "notification": s_notification, "impact": s_impact, "souffle": lambda: s_souffle(0.6),
    "dispersion": s_dispersion, "erreur": s_erreur, "fenetre": s_fenetre, "coupure": s_coupure,
    "deconnexion": s_deconnexion, "question": s_question, "impulsion": s_impulsion, "aspiration": s_aspiration,
    "fusion": s_fusion, "succes": s_succes, "ouverture": s_ouverture, "validation": s_validation, "avance": s_avance,
    "ligne": s_ligne, "logo": s_logo,
}

# ---------------------------------------------------------------- musique
M = L["musique"]
t_tension = sec(M["tension_fin"])
t_montee = sec(M["montee_debut"])
t_calme = sec(M["apaisee_debut"])
t_fin = sec(M["fin_nette"])
t = np.arange(N) / SR
musique = np.zeros(N)

# 1. Tension : bourdon grave, pulsation cardiaque
masque1 = (t < t_tension).astype(float)
fondu1 = np.clip(t / 0.4, 0, 1) * np.clip((t_tension - t) / 0.15, 0, 1)
bourdon = sum(np.sin(2 * np.pi * f * t + p) / (i + 1) for i, (f, p) in enumerate(((55, 0), (55.4, 1), (82.4, 2), (110.3, 0.5), (116.5, 1.2))))
bourdon *= 0.5 + 0.15 * np.sin(2 * np.pi * 0.25 * t)
musique += bourdon * fondu1 * 0.1
battement = 60 / 96
k = 0.0
while k < t_tension - 0.2:
    tb = tt(0.4)
    coup = np.sin(2 * np.pi * (48 + 40 * np.exp(-tb * 25)) * tb) * env(len(tb), 0.003, 0.15)
    ajoute(musique, coup, k, 0.35)
    ajoute(musique, coup, k + 0.22, 0.18)
    k += battement * 2
# tic discret d'horloge
k = 0.25
while k < t_tension - 0.2:
    ajoute(musique, s_clic(), k, 0.25)
    k += battement
# montée avant la bascule
d = t_tension - t_montee
nm = int(d * SR)
km = np.linspace(0, 1, nm)
montee = passe_bas(rng.standard_normal(nm), 300 + 5000 * km ** 2) * km ** 2 * 0.25
montee += np.sin(2 * np.pi * np.cumsum(110 + 330 * km ** 2) / SR) * km ** 2 * 0.06
ajoute(musique, montee, t_montee)

# 2. Apaisement : accords lumineux en ré majeur, arpèges, rythme léger
tempo = 104
temps = 60 / tempo
mesure = temps * 4
accords = [(50, [62, 66, 69, 73, 76]), (47, [59, 62, 66, 69, 73]), (43, [59, 62, 66, 69, 74]), (45, [57, 62, 64, 69, 71])]
pos = t_calme
idx = 0
while pos < t_fin:
    basse, notes = accords[idx % 4]
    dur = min(mesure, t_fin - pos)
    tm = tt(dur + 1.5)
    nappe = sum(np.sin(2 * np.pi * note(m) * tm) + 0.5 * np.sin(2 * np.pi * note(m) * 1.003 * tm) for m in notes)
    e = np.minimum(1, tm / 0.35) * np.exp(-np.maximum(0, tm - dur) * 3)
    ajoute(musique, nappe * e * 0.03, pos)
    tb = tt(dur + 0.6)
    b = np.sin(2 * np.pi * note(basse - 12) * tb) + 0.3 * np.sin(2 * np.pi * note(basse) * tb)
    ajoute(musique, b * env(len(tb), 0.02, dur, 1.5) * 0.12, pos)
    # arpège en croches
    arp = notes + [notes[1] + 12, notes[2] + 12]
    for j in range(8):
        tj = pos + j * temps / 2
        if tj >= t_fin:
            break
        m = arp[(j * 3) % len(arp)] + 12
        tn = tt(0.5)
        son = (np.sin(2 * np.pi * note(m) * tn) + 0.25 * np.sin(2 * np.pi * note(m) * 2 * tn)) * env(len(tn), 0.002, 0.18)
        ajoute(musique, son, tj, 0.07)
    # pulsation douce (à partir de la 2e mesure)
    if idx >= 1:
        for j in range(4):
            tj = pos + j * temps
            if tj >= t_fin - 0.05:
                break
            tk = tt(0.3)
            kick = np.sin(2 * np.pi * (50 + 60 * np.exp(-tk * 30)) * tk) * env(len(tk), 0.002, 0.09)
            if j % 2 == 0:
                ajoute(musique, kick, tj, 0.4)
            hat = passe_haut_fft(rng.standard_normal(int(0.05 * SR)), 7000) * env(int(0.05 * SR), 0.001, 0.012)
            ajoute(musique, hat, tj + temps / 2, 0.08)
    pos += mesure
    idx += 1

# fin nette : coupe franche avec très court fondu
musique *= np.clip((t_fin - t) / 0.03, 0, 1)

# ---------------------------------------------------------------- bruitages
bruitages = np.zeros(N)
for ev in L["sons"]:
    nom = ev["son"]
    son = s_frappe(ev.get("duree", 15)) if nom == "frappe" else SONS[nom]()
    ajoute(bruitages, son, sec(ev["t"]))

# ---------------------------------------------------------------- mixage
musique = reverb(musique, 2.4, 0.28)
bruitages = reverb(bruitages, 1.2, 0.18)
mix = musique * 0.85 + bruitages
mix = passe_haut_fft(mix, 28)
mix = np.tanh(mix * 1.4) / np.tanh(1.4)  # douce saturation, évite les crêtes
mix /= np.max(np.abs(mix)) + 1e-9
mix *= 10 ** (-1.0 / 20)
mix[int(t_fin * SR):] = 0

# léger élargissement stéréo
retard = int(0.011 * SR)
g = mix
dr = np.concatenate([np.zeros(retard), mix[:-retard]])
gauche = 0.82 * g + 0.18 * dr
droite = 0.82 * dr + 0.18 * g
stereo = np.stack([gauche, droite], axis=1)
stereo /= np.max(np.abs(stereo)) / (10 ** (-1.0 / 20))

sortie = os.path.join(RACINE, "public", "audio", "bande-son.wav")
os.makedirs(os.path.dirname(sortie), exist_ok=True)
with wave.open(sortie, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((stereo * 32767).astype(np.int16).tobytes())
print("écrit", sortie, f"{DUREE:.2f} s")
