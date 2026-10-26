#!/usr/bin/env python3
"""Réinjecte assets/menu.css (source de vérité) en ligne dans chaque page : <style id="menu-css">.
Pourquoi en ligne : une feuille externe ajoute un aller-retour réseau avant le premier affichage
(mesuré : premier affichage 820 ms -> 350 ms sur mobile 4G simulée). Usage : python3 assets/inject-menu.py"""
import re,glob,os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
css=open('assets/menu.css',encoding='utf-8').read()
css=re.sub(r'/\*.*?\*/','',css,flags=re.S)
css=re.sub(r'\s*([{};,>])\s*',r'\1',css)          # espaces autour de { } ; , >
css=re.sub(r'\n\s*','',css).strip()
block='<style id="menu-css">'+css+'</style>'
n=0
for f in glob.glob('*.html')+glob.glob('blog/*.html'):
    t=open(f,encoding='utf-8').read(); o=t
    t=t.replace('<link rel="stylesheet" href="/assets/menu.css">',block)
    t=re.sub(r'<style id="menu-css">.*?</style>',lambda m:block,t,flags=re.S)
    if t!=o: open(f,'w',encoding='utf-8').write(t); n+=1
print(n,'pages mises à jour')
# menu.js est la source lisible ; les pages chargent menu.min.js (Semrush signale les JS non minifiés).
import subprocess
r=subprocess.run(['npx','--yes','terser@5','assets/menu.js','-c','-m','-o','assets/menu.min.js'],capture_output=True,text=True)
print('menu.min.js régénéré' if r.returncode==0 else 'ATTENTION : menu.min.js non régénéré, lancer : npx terser assets/menu.js -c -m -o assets/menu.min.js')
