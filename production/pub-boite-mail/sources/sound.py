"""Sound design synthétisé (musique + effets) calé sur timeline.json.
Sortie : music.wav (musique, déjà « duckée » sous la voix) et sfx.wav (effets)."""
import json, wave
import numpy as np

TL = json.load(open('timeline.json'))
SR = 48000
DUR = TL['duration']
N = int(SR * DUR)
rng = np.random.default_rng(7)
t = np.arange(N) / SR

def buf():
    return np.zeros((N, 2))

def onepole_lp(x, fc):
    """Passe-bas 1 pôle, fc scalaire ou tableau (Hz)."""
    fc = np.broadcast_to(np.asarray(fc, float), x.shape[:1])
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x); s = np.zeros(x.shape[1:])
    for i in range(len(x)):
        s = (1 - a[i]) * x[i] + a[i] * s
        y[i] = s
    return y

def lp_fast(x, fc):
    """Passe-bas 1 pôle à fc fixe, vectorisé par blocs via scipy-free IIR (lfilter maison)."""
    a = np.exp(-2 * np.pi * fc / SR)
    # filtrage récursif par cumul : y[n] = (1-a) x[n] + a y[n-1]
    y = np.empty_like(x); s = np.zeros(x.shape[1:])
    b = 1 - a
    for i in range(0, len(x)):
        s = b * x[i] + a * s
        y[i] = s
    return y

def env_adsr(n, a, d, s, r, sus_len):
    A = int(a * SR); D = int(d * SR); R = int(r * SR); S_ = max(0, n - A - D - R)
    e = np.concatenate([np.linspace(0, 1, A, endpoint=False), np.linspace(1, s, D, endpoint=False),
                        np.full(S_, s), np.linspace(s, 0, R)])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))

def place(dst, sig, at, gain=1.0, pan=0.0):
    i0 = int(at * SR)
    if i0 >= N: return
    sig = sig[: N - i0]
    if sig.ndim == 1:
        l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l * 1.414, sig * r * 1.414], 1)
    dst[i0:i0 + len(sig)] += sig * gain

def sine(f, d, ph=0):
    tt = np.arange(int(d * SR)) / SR
    return np.sin(2 * np.pi * f * tt + ph)

# ---------- effets ----------
def ping(f1=1318.5, f2=1975.5, d=0.35):
    n = int(d * SR); tt = np.arange(n) / SR
    e1 = np.exp(-tt * 22); e2 = np.exp(-np.maximum(tt - 0.06, 0) * 20) * (tt > 0.06)
    return (np.sin(2*np.pi*f1*tt) * e1 + 0.8 * np.sin(2*np.pi*f2*tt) * e2) * 0.5

def tick(f=2200, d=0.08):
    n = int(d * SR); tt = np.arange(n) / SR
    return np.sin(2*np.pi*f*tt) * np.exp(-tt * 70) * 0.6 + rng.normal(0, 1, n) * np.exp(-tt * 400) * 0.15

def click(d=0.05):
    n = int(d * SR); tt = np.arange(n) / SR
    x = rng.normal(0, 1, n) * np.exp(-tt * 260)
    x = x - lp_fast(x[:, None], 1500)[:, 0]
    return x * 0.5 + np.sin(2*np.pi*900*tt) * np.exp(-tt*120) * 0.2

def whoosh(d, f0=300, f1=3000, up=True):
    n = int(d * SR); x = rng.normal(0, 1, (n, 2))
    fc = np.geomspace(f0, f1, n) if up else np.geomspace(f1, f0, n)
    y = onepole_lp(x, fc); y = y - onepole_lp(y, fc * 0.25)
    e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return y * e[:, None] * 1.6

def chime(freqs, d=2.5, decay=2.2):
    n = int(d * SR); tt = np.arange(n) / SR; out = np.zeros(n)
    for i, f in enumerate(freqs):
        st = i * 0.06; m = tt >= st; tl = tt - st
        out += m * (np.sin(2*np.pi*f*tl) + 0.25*np.sin(2*np.pi*2*f*tl)*np.exp(-tl*6)) * np.exp(-tl * decay) * (1 - np.exp(-tl * 300))
    return out / len(freqs)

def bell(f, d=4.0):
    n = int(d * SR); tt = np.arange(n) / SR
    parts = [(1, 1, 1.2), (2.0, .5, 1.8), (2.76, .35, 2.6), (5.4, .12, 4.5), (0.5, .4, 1.0)]
    out = sum(a * np.sin(2*np.pi*f*r*tt) * np.exp(-tt * k) for r, a, k in parts)
    return out * (1 - np.exp(-tt * 200)) * 0.35

# ---------- musique ----------
def pad(freqs, t0, t1, gain, att=1.0, rel=0.6, cutoff=(800, 800), detune=0.25):
    n = int((t1 - t0) * SR); tt = np.arange(n) / SR
    sig = np.zeros((n, 2))
    for f in freqs:
        for k, (dt, pan) in enumerate([(-detune, -.6), (detune, .6), (0, 0)]):
            ff = f * 2 ** (dt / 12)
            ph = rng.uniform(0, 6.28)
            # dents de scie douces (5 harmoniques)
            w = sum(np.sin(2*np.pi*ff*h*tt + ph*h) / h for h in range(1, 6))
            l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
            sig[:, 0] += w * l; sig[:, 1] += w * r
    sig /= len(freqs) * 3
    fc = np.geomspace(cutoff[0], cutoff[1], n)
    sig = onepole_lp(onepole_lp(sig, fc), fc)
    e = np.minimum(1, tt / att) * np.minimum(1, (t1 - t0 - tt) / rel).clip(0, 1)
    out = buf(); out[int(t0*SR):int(t0*SR)+n] += sig * e[:, None] * gain
    return out

def sub_pulse(t0, t1, bpm, gain, f=55):
    out = buf(); beat = 60 / bpm; k = t0
    while k < t1:
        n = int(0.5 * SR); tt = np.arange(n) / SR
        fr = f * (1 + 1.5 * np.exp(-tt * 30))
        s = np.sin(2*np.pi*np.cumsum(fr)/SR) * np.exp(-tt * 9) * (1 - np.exp(-tt * 400))
        place(out, s, k, gain); k += beat
    return out

music = buf(); sfx = buf()
cut = TL['cut']

# Acte 1 (0 – coupure) : tension qui monte
A_m = [110.0, 164.81, 261.63, 329.63]
music += pad(A_m, 0.0, cut, 0.55, att=2.5, rel=0.01, cutoff=(350, 2600))
pulse = sub_pulse(1.0, cut, 112, 0.0)
# tic-tac hi-hat de plus en plus dense
k = 1.0
while k < cut:
    prog = k / cut
    n = int(0.03 * SR); x = rng.normal(0, 1, n) * np.exp(-np.arange(n) / SR * 250)
    place(sfx, x - lp_fast(x[:, None], 6000)[:, 0], k, 0.05 + 0.10 * prog, pan=rng.uniform(-.3, .3))
    k += (60 / 112) / (2 if prog < .5 else 4)
music += sub_pulse(5.0, cut, 112, 0.22)
# montée de bruit
rise = whoosh(cut - 6.0, 400, 6000) * 0.35
place(sfx, rise, 6.0)

# notifications à chaque arrivée
n_arr = TL['arrivalCount']; A0 = TL['arrivalStart']; A1 = TL['arrivalEnd']
for r in range(n_arr):
    at = A0 + (A1 - A0) * ((n_arr - 1 - r) / (n_arr - 1)) ** 0.6
    prog = (at - A0) / (A1 - A0)
    semis = rng.choice([0, 2, 4, 7])
    place(sfx, ping(1318.5 * 2 ** (semis / 12), 1975.5 * 2 ** (semis / 12)), at, 0.10 + 0.10 * prog, pan=rng.uniform(-.5, .5))

# clics + ouvertures de fenêtres (scène 2)
for c in TL['clicks'][:3]:
    place(sfx, click(), c, 0.55)
    place(sfx, whoosh(0.35, 800, 4000) * 0.25, c + 0.02)

# coupure nette -> silence -> transition douce
fade = int(0.012 * SR)
i_cut = int(cut * SR)
for b in (music, sfx):
    b[i_cut - fade:i_cut] *= np.linspace(1, 0, fade)[:, None]
    b[i_cut:int(10.3 * SR)] = 0

sw0, sw1 = TL['sweep']
place(sfx, whoosh(sw1 - sw0 + 0.5, 200, 5000) * 0.45, sw0 - 0.1)
place(sfx, chime([523.25, 659.25, 783.99, 987.77], d=3.0, decay=1.4), sw0, 0.35)

# tri : petits tics de validation, pentatonique montante
penta = [880, 987.77, 1174.66, 1318.5, 1480, 1760, 1975.5, 2349.3, 2637, 2960, 3520]
for r in range(11):
    at = TL['sortStart'] + r * TL['sortStagger'] + TL['sortDur'] * 0.85
    place(sfx, tick(penta[r] * 0.75, 0.12), at, 0.22, pan=-.4 + .08 * r)

# Acte 2 (calme) : Fmaj9
F_m = [87.31, 130.81, 220.0, 329.63, 392.0]
music += pad(F_m, 10.35, 33.6, 0.42, att=2.2, rel=1.0, cutoff=(500, 1500))
music += sub_pulse(14.0, 32.8, 96, 0.13, f=43.65)
# arpège doux
arp = [349.23, 440.0, 523.25, 659.25, 783.99, 659.25, 523.25, 440.0]
k, i = 14.0, 0
while k < 32.6:
    place(music, chime([arp[i % 8]], d=1.2, decay=4.5), k, 0.10, pan=np.sin(i) * .4)
    k += 60 / 96 / 2; i += 1

# scène 4
place(sfx, whoosh(0.9, 300, 2500) * 0.3, TL['prioStart'])
nmT = TL['newMail']
place(sfx, ping(1046.5, 1568.0), nmT['in'], 0.18)
sh = rng.normal(0, 1, (int(1.0 * SR), 2)); sh = sh - onepole_lp(sh, np.full(len(sh), 7000.0))
place(sfx, sh * np.sin(np.linspace(0, np.pi, len(sh)))[:, None] * 0.06, nmT['in'] + 0.3)
place(sfx, tick(1760, 0.1), nmT['tag'], 0.3)
place(sfx, whoosh(nmT['land'] - nmT['fly'], 2500, 500, up=True) * 0.3, nmT['fly'])
place(sfx, tick(1318.5, 0.12), nmT['land'], 0.3)

# scène 5 : frappe, clic, validation
place(sfx, whoosh(0.7, 300, 3000) * 0.3, 20.0)
k = TL['typing'][0]
while k < TL['typing'][1]:
    n = int(0.02 * SR); x = rng.normal(0, 1, n) * np.exp(-np.arange(n) / SR * 500)
    place(sfx, x - lp_fast(x[:, None], 3000)[:, 0], k, 0.035, pan=rng.uniform(-.2, .2))
    k += rng.uniform(0.035, 0.07)
place(sfx, click(), TL['clicks'][3], 0.6)
place(sfx, chime([783.99, 1174.66], d=1.6, decay=3.5), TL['clicks'][3] + 0.08, 0.35)
place(sfx, tick(1568, 0.1), 24.85, 0.25)

# scène 6 : tableau de bord
place(sfx, whoosh(0.9, 2500, 300, up=True) * 0.25, 27.0)
for i in range(3):
    place(sfx, tick(1174.66 * 2 ** (i * 4 / 12), 0.12), TL['dash'] + 0.2 + i * 0.18, 0.2)

# scène 7 : réduction, signature sonore, CTA
place(sfx, whoosh(0.9, 3000, 150, up=True) * 0.4, TL['shrink'])
lg = TL['logo']
for f, g in [(261.63, 1), (392.0, .7), (523.25, .6), (659.25, .45)]:
    place(sfx, bell(f, 5.0), lg + 0.05, 0.33 * g)
subdrop = sine(1, 2.5)
tt = np.arange(int(2.5 * SR)) / SR
subdrop = np.sin(2*np.pi*np.cumsum(65 * (1 + np.exp(-tt * 8)))/SR) * np.exp(-tt * 1.8) * (1 - np.exp(-tt * 200))
place(sfx, subdrop, lg, 0.45)
music += pad([65.41, 130.81, 196.0, 329.63, 493.88], lg - 0.2, DUR, 0.33, att=1.5, rel=2.2, cutoff=(500, 1100))
place(sfx, tick(1046.5, 0.15), 35.0, 0.22)

# ---------- réverbe (bus effets) ----------
def reverb(x, rt=1.8, mix=0.25):
    n = int(rt * SR); tt = np.arange(n) / SR
    ir = rng.normal(0, 1, (n, 2)) * np.exp(-tt * 6.9 / rt)[:, None]
    ir = onepole_lp(ir, np.full(n, 5000.0)); ir /= np.sqrt((ir ** 2).sum(0))
    L = len(x) + n; F = 1 << (L - 1).bit_length()
    wet = np.stack([np.fft.irfft(np.fft.rfft(x[:, c], F) * np.fft.rfft(ir[:, c], F), F)[:len(x)] for c in range(2)], 1)
    return x * (1 - mix) + wet * mix * 1.2

sfx = reverb(sfx, 1.6, 0.3)
music = reverb(music, 2.4, 0.25)

# ---------- ducking sous la voix ----------
speech = [(0.67, 2.92), (5.2, 8.38), (10.57, 12.8), (14.72, 17.43), (20.82, 24.54), (27.52, 31.08), (33.52, 34.37), (34.96, 37.98)]
duck = np.ones(N)
for a, b in speech:
    duck[int((a - .12) * SR):int((b + .2) * SR)] = 0.5
k = int(0.12 * SR); duck = np.convolve(duck, np.ones(k) / k, mode='same')
music *= duck[:, None]; sfx *= (0.5 + 0.5 * duck)[:, None]

def write(name, x):
    x = np.clip(x, -1, 1)
    w = wave.open(name, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((x * 32767).astype('<i2').tobytes()); w.close()

# niveaux relatifs : on normalise ensemble pour garder l’équilibre musique/effets
peak = max(np.abs(music).max(), np.abs(sfx).max())
write('music.wav', music / peak * 0.89)
write('sfx.wav', sfx / peak * 0.89)
print('ok', np.abs(music).max(), np.abs(sfx).max())
