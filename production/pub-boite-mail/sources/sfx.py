"""Bruitages seuls (aucune musique), calés sur timeline.json et sur les formules d'animation de pub.html.
Sortie : sfx.wav (48 kHz stéréo)."""
import json, wave
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

TL = json.load(open('timeline.json'))
SR = 48000
DUR = TL['duration'] + 0.0
N = int(SR * DUR)
rng = np.random.default_rng(3)
mix = np.zeros((N, 2))
send = np.zeros((N, 2))   # bus réverbe

def tt(d): return np.arange(int(d * SR)) / SR
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x, axis=0)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x, axis=0)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x, axis=0)

def put(sig, at, g=1.0, pan=0.0, rev=0.25):
    i0 = int(at * SR)
    if i0 >= N or at < 0: return
    sig = sig[:N - i0]
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l, sig * r], 1) * 1.414
    mix[i0:i0 + len(sig)] += sig * g
    send[i0:i0 + len(sig)] += sig * g * rev

# ---------- générateurs ----------
def env(d, a=0.002, k=30.0):
    x = tt(d); return (1 - np.exp(-x / max(a, 1e-4))) * np.exp(-x * k)

def ding(f=1568, d=1.2):
    x = tt(d)
    s = np.sin(2*np.pi*f*x) * np.exp(-x*5) + .45*np.sin(2*np.pi*f*2.01*x) * np.exp(-x*9) + .25*np.sin(2*np.pi*f*3.2*x)*np.exp(-x*14)
    return s * (1 - np.exp(-x*900)) * .5

def tick(f=3000, d=.035, noise=.5):
    x = tt(d); e = np.exp(-x * 180)
    return (np.sin(2*np.pi*f*x) * .6 + hp(rng.normal(0, 1, len(x)), 2500) * noise) * e

def click(heavy=False):
    d = .08; x = tt(d)
    n = hp(rng.normal(0, 1, len(x)), 1200) * np.exp(-x * (260 if not heavy else 160))
    body = np.sin(2*np.pi*(1800 if not heavy else 900)*x) * np.exp(-x*120) * .5
    thump = np.sin(2*np.pi*140*x) * np.exp(-x*60) * (.6 if heavy else .2)
    return (n * .6 + body + thump)

def pop(f0=400, f1=1400, d=.12):
    x = tt(d); f = np.geomspace(f0, f1, len(x))
    return np.sin(2*np.pi*np.cumsum(f)/SR) * env(d, .002, 30) * .8

def whoosh(d, f0=300, f1=4000, peak=.6, width=1.0):
    n = int(d*SR); x = rng.normal(0, 1, n)
    out = np.zeros(n); blk = 1024
    fs = np.geomspace(f0, f1, n // blk + 2)
    for i in range(0, n, blk):
        fc = fs[i // blk]; lo, hi = max(40, fc / (1.6 + width)), min(SR/2 - 100, fc * (1.6 + width))
        seg = x[max(0, i-2048):i+blk]
        out[i:i+blk] = bp(seg, lo, hi)[-min(blk, n-i):]
    u = np.linspace(0, 1, n)
    e = np.where(u < peak, (u/peak)**2, ((1-u)/(1-peak))**1.5)
    return out * e * 1.4

def stereo_whoosh(d, f0, f1, peak=.6, pan0=-.6, pan1=.6):
    w = whoosh(d, f0, f1, peak); p = np.linspace(pan0, pan1, len(w))
    return np.stack([w*np.cos((p+1)*np.pi/4), w*np.sin((p+1)*np.pi/4)], 1) * 1.414

def impact(d=2.5, sub=48, bright=1.0):
    x = tt(d)
    f = sub * (1 + 2.5*np.exp(-x*22))
    s = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-x*2.6) * (1-np.exp(-x*600))
    n = lp(rng.normal(0, 1, len(x)), 6000) * np.exp(-x*7) * .5 * bright
    snap = hp(rng.normal(0, 1, len(x)), 3000) * np.exp(-x*60) * .5 * bright
    return s * 1.1 + n + snap

def hit(f=60):
    x = tt(.6)
    fr = f * (1 + 3*np.exp(-x*35))
    k = np.sin(2*np.pi*np.cumsum(fr)/SR) * np.exp(-x*7)
    sn = bp(rng.normal(0, 1, len(x)), 800, 6000) * np.exp(-x*28) * .55
    return k + sn

def riser(d, f0=200, f1=2400):
    x = tt(d); f = np.geomspace(f0, f1, len(x))
    tone = np.sin(2*np.pi*np.cumsum(f)/SR) * .12 + np.sin(2*np.pi*np.cumsum(f*1.5)/SR) * .06
    w = whoosh(d, 300, 7000, peak=.98)
    e = (x / d) ** 2
    return tone * e + w * .7

def reverse_swell(d=1.0):
    n = int(d*SR); x = hp(rng.normal(0, 1, n), 1500)
    e = np.linspace(0, 1, n) ** 3
    return x * e * .5

def shimmer(f=2093, d=2.0):
    x = tt(d); s = np.zeros(len(x))
    for k, r in enumerate([1, 1.5, 2, 3, 4]):
        s += np.sin(2*np.pi*f*r*x + k) * np.exp(-x*(2+k)) / (k+1)
    return s * (1-np.exp(-x*40)) * .25

def key(d=.025):
    x = tt(d); return (bp(rng.normal(0, 1, len(x)), 1500, 7000) * np.exp(-x*300) + np.sin(2*np.pi*rng.uniform(2200, 3200)*x)*np.exp(-x*400)*.3)

def flip(d=.06):
    x = tt(d); return bp(rng.normal(0, 1, len(x)), 1200, 9000) * env(d, .004, 70)

def glitch(d=.22):
    x = tt(d); s = np.sign(np.sin(2*np.pi*rng.uniform(300, 700)*x)) * .3
    s = np.round(s * 4) / 4 + hp(rng.normal(0, 1, len(x)), 2000) * .3
    gate = (np.floor(x * 60) % 2 == 0)
    return s * gate * np.exp(-x*8)

def boom_bell(f=523.25):
    x = tt(4.0); s = np.zeros(len(x))
    for r, a, k in [(1, 1, 1.0), (2.0, .4, 1.6), (2.76, .3, 2.4), (5.4, .1, 4), (.5, .5, .8)]:
        s += a*np.sin(2*np.pi*f*r*x)*np.exp(-x*k)
    return s*(1-np.exp(-x*300))*.22

# ---------- placement ----------
T = TL
# ouverture : 3 notifications
for i, t0 in enumerate(T['cold']):
    put(ding([1318.5, 1568, 1760][i]), t0, .32 + .06*i, pan=[0, -.35, .35][i], rev=.4)
    put(pop(300, 900, .08), t0, .25)

# explosion
put(impact(2.8, 44), T['boom'], .9, rev=.35)
put(stereo_whoosh(1.1, 200, 6000, .25, 0, 0), T['boom'] - .02, .55)
put(reverse_swell(.5), T['boom'] - .5, .5)
# apparition des cartes (même formule que pub.html)
for r in range(3, 60):
    st = T['boom'] + .05 + 2.3 * ((r - 3) / 56) ** .62
    put(flip(.05), st, .10 + .08*rng.random(), pan=rng.uniform(-.8, .8), rev=.15)
    if r % 3 == 0: put(ding(rng.choice([1760, 1975.5, 2349.3, 2637]), .5), st, .05 + .05*(r/60), pan=rng.uniform(-.7, .7), rev=.3)
# compteur 00 -> 60
c0, c1 = T['boom'] + .12, T['boom'] + 1.4
prev = 0
for k in range(1, 2000):
    t = c0 + (c1 - c0) * k / 2000
    v = round(60 * (1 - (1 - k / 2000) ** 3))
    if v != prev: put(tick(4200, .02, .3), t, .12, rev=.05); prev = v
# titres
for t0 in [1.62, 2.6]: put(whoosh(.35, 1500, 7000, .3), t0, .18)
put(whoosh(.3, 5000, 1200, .5), 3.62, .14)

# mots-chocs + montée
for i, t0 in enumerate(T['words']):
    put(hit(58), t0, .75, rev=.25)
    put(stereo_whoosh(.3, 600, 6000, .7, -.5 + .3*i, .5 - .3*i), t0 - .22, .3)
for t0 in T['stutter']:
    put(glitch(), t0, .35, pan=rng.uniform(-.4, .4))
    put(hit(70)[:int(.25*SR)], t0, .45)
rz = riser(T['freeze'] - 5.2)
put(rz, 5.2, .5, rev=.3)
# arrêt net -> silence (on coupe tout ce qui déborde)
i_fr = int(T['freeze'] * SR); fade = int(.01 * SR)
mix[i_fr - fade:i_fr] *= np.linspace(1, 0, fade)[:, None]; mix[i_fr:int((T['freeze'] + .25) * SR)] = 0
send[i_fr:int((T['freeze'] + .25) * SR)] *= .3
# gel : cristal + souffle de rotation
put(shimmer(2637, 2.2), T['freeze'] + .02, .25, rev=.6)
put(stereo_whoosh(2.0, 150, 900, .5, .6, -.6), T['freeze'] + .05, .22)
put(whoosh(.4, 1500, 7000, .3), 8.35, .15)
put(reverse_swell(1.0), T['drop'] - 1.0, .7, rev=.2)

# le drop
put(impact(3.0, 40, 1.3), T['drop'], 1.0, rev=.4)
put(stereo_whoosh(1.0, 120, 5000, .2, 0, 0), T['drop'], .5)
put(shimmer(1568, 2.5), T['drop'] + .05, .3, rev=.6)
for i in range(60):   # retournements
    put(flip(.045), T['drop'] + .03 + .65 * (rng.random() ** 1.4), .09, pan=rng.uniform(-.8, .8), rev=.15)
for g, t0 in enumerate(T['decks']):
    x = tt(.3); fr = 170 * 2 ** (g * 2 / 12) * (1 + .8*np.exp(-x*40))
    th = np.sin(2*np.pi*np.cumsum(fr)/SR) * np.exp(-x*18)
    put(th, t0, .45, pan=.25, rev=.2); put(click(), t0, .35, pan=.25)
    put(ding(1046.5 * 2 ** ([0, 2, 4, 7, 9][g] / 12), .6), t0 + .02, .10, pan=.3, rev=.4)
    for k in range(6): put(tick(3800, .015, .2), t0 - .1 + k*.11, .05, pan=-.6)

# whip vers l'interface
put(stereo_whoosh(.45, 300, 7000, .45, .2, -.2), T['whip'] - .05, .7)
put(hit(50)[:int(.4*SR)], T['whip'] + .55, .35)
put(whoosh(.35, 1500, 7000, .3), 13.0, .15)
for t0 in T['lift']:
    put(pop(350, 1300, .14), t0, .35, rev=.3); put(whoosh(.3, 800, 5000, .5), t0 - .1, .12)
for g in range(5):
    a = T['whip'] + .7 + g * .1
    for k in range(10): put(tick(3600 + 200*g, .015, .2), a + k * .1 * (1 + k*.08), .05, pan=.4)
# nouveau mail
put(stereo_whoosh(.5, 400, 8000, .75, .8, -.2), T['comet'] - .1, .55)
put(ding(2093, .8), T['comet'] + .4, .2, rev=.4)
x = tt(.45); scan = np.sin(2*np.pi*np.cumsum(np.geomspace(900, 3200, len(x)))/SR) * np.sin(np.linspace(0, np.pi, len(x))) * .2
put(scan, T['scan'], .5, rev=.3)
put(click(True), T['stamp'], .6); put(ding(2637, .6), T['stamp'] + .01, .18, rev=.3)
put(whoosh(.5, 4000, 400, .7), T['slot'] - .2, .3)
put(click(), T['slot'] + .3, .4); put(tick(2500, .03), T['slot'] + .32, .2)

# plongée dans la carte
put(riser(.55, 300, 3000), T['dive'] - .05, .6)
put(impact(1.2, 70, .6), T['dive'] + .35, .45, rev=.3)
put(whoosh(.35, 1500, 7000, .3), 17.6, .15)
put(pop(500, 1200, .1), T['dive'] + .45, .25)
put(whoosh(.4, 800, 5000, .6), T['typing'][0] - .55, .2)
# frappe
t = T['typing'][0]
while t < T['typing'][1]:
    put(key(), t, .14 + .06*rng.random(), pan=rng.uniform(-.2, .2), rev=.08)
    t += rng.uniform(.028, .06)
for f in [18.6, 19.3, 19.8]: put(shimmer(3136, .6), f, .07, rev=.4)
put(whoosh(.35, 800, 5000, .6), T['typing'][1] + .05, .2)
put(whoosh(.35, 1500, 7000, .3), 20.6, .15)
# validation
put(click(True), T['toggle'], .65)
put(whoosh(.25, 900, 4000, .5), T['toggle'] + .02, .25)
put(ding(1568, .7), T['toggle'] + .25, .22, rev=.4); put(ding(2349.3, .9), T['toggle'] + .33, .22, rev=.4)
put(pop(400, 1100, .1), T['toggle'] + .4, .2)
put(click(True), T['press'], .7)
put(stereo_whoosh(.45, 500, 8000, .8, 0, 0), T['sendFly'], .6)
put(impact(1.5, 60, .7), T['result'], .55, rev=.35)
for i, t0 in enumerate(T['tiles']):
    put(flip(.08), t0, .3, pan=[-.5, 0, .5][i]); put(ding(1318.5 * 2 ** (i*4/12), .6), t0 + .4, .16, pan=[-.5, 0, .5][i], rev=.4)
put(whoosh(.35, 1500, 7000, .3), 23.15, .15)
# bascule photo
put(stereo_whoosh(.6, 3000, 300, .4, .3, -.3), T['swap'], .4)
put(whoosh(.35, 1500, 7000, .3), 25.55, .15)
put(shimmer(1760, 1.6), 25.7, .12, rev=.6)
put(stereo_whoosh(1.4, 300, 2200, .5, -.4, .4), 25.95, .16)
put(shimmer(2349.3, 1.4), 26.9, .08, rev=.6)
put(stereo_whoosh(1.0, 2000, 500, .5, .4, -.4), 27.4, .12)
# implosion -> flash -> logo
put(reverse_swell(T['flash'] - T['implode']), T['implode'], 1.0, rev=.2)
x = tt(T['flash'] - T['implode']); suck = np.sin(2*np.pi*np.cumsum(np.geomspace(80, 900, len(x)))/SR) * (x/x[-1])**3 * .3
put(suck, T['implode'], .6)
put(impact(3.5, 38, 1.2), T['flash'], 1.0, rev=.45)
for f, a in [(261.63, 1), (392, .7), (523.25, .6), (783.99, .35)]:
    put(boom_bell(f), T['flash'] + .05, .5 * a, rev=.6)
put(shimmer(2093, 2.0), T['flash'] + .8, .15, rev=.6)
put(whoosh(.4, 1500, 7000, .3), 30.15, .15)
for k in range(12): put(tick(5000, .012, .2), 31.0 + k * .04, .05)
put(pop(250, 900, .18), T['cta'], .45, rev=.3); put(click(), T['cta'] + .05, .3)
for i in range(4): put(tick(3200 + 300*i, .03), T['cta'] + .25 + i*.07 + .15, .2, rev=.2)
put(whoosh(.8, 2000, 300, .3), T['cta'] + .4, .12)
put(whoosh(.4, 1200, 5000, .5), 32.6, .12)

# ---------- réverbe + air ----------
n = int(2.4 * SR); x = np.arange(n) / SR
ir = rng.normal(0, 1, (n, 2)) * np.exp(-x * 2.8)[:, None]
ir = lp(ir, 7000); ir /= np.sqrt((ir**2).sum(0))
wet = np.stack([fftconvolve(send[:, c], ir[:, c])[:N] for c in range(2)], 1)
air = lp(hp(rng.normal(0, 1, (N, 2)), 300), 3000) * .004
air[int(T['freeze']*SR):int((T['freeze']+.25)*SR)] = 0
out = mix + wet * .55 + air
fo = int(1.5 * SR); out[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 2
out /= np.abs(out).max() / .9
w = wave.open('sfx.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes()); w.close()
print('ok')
