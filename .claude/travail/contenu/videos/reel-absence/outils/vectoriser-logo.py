"""Vectorise le logo officiel (logo.png à la racine du site) en SVG blanc net.
Usage : python3 outils/vectoriser-logo.py ../../../../../logo.png public/logo-sl-agence.svg"""
import sys
import numpy as np
from PIL import Image
import potrace

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("L")
k = 6
big = im.resize((im.width * k, im.height * k), Image.LANCZOS)
a = np.asarray(big, dtype=np.float32)
mask = a > 160  # lettres blanches sur fond vert
ys, xs = np.where(mask)
pad = 4 * k
x0, x1, y0, y1 = xs.min() - pad, xs.max() + pad, ys.min() - pad, ys.max() + pad
mask = mask[y0:y1, x0:x1]
bmp = potrace.Bitmap(~mask)  # potracer trace les pixels « faux »
path = bmp.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.2)
parts = []
for curve in path:
    s = curve.start_point
    d = [f"M{s.x:.1f},{s.y:.1f}"]
    for seg in curve.segments:
        if seg.is_corner:
            d.append(f"L{seg.c.x:.1f},{seg.c.y:.1f}L{seg.end_point.x:.1f},{seg.end_point.y:.1f}")
        else:
            d.append(f"C{seg.c1.x:.1f},{seg.c1.y:.1f} {seg.c2.x:.1f},{seg.c2.y:.1f} {seg.end_point.x:.1f},{seg.end_point.y:.1f}")
    d.append("Z")
    parts.append("".join(d))
h, w = mask.shape
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="#F5F6F2" fill-rule="evenodd" d="{" ".join(parts)}"/></svg>'
open(dst, "w").write(svg)
print("ok", w, h, len(svg))
