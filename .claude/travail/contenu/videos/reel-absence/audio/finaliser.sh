#!/bin/bash
# Génère la bande-son puis la normalise au niveau conseillé pour Instagram (-14 LUFS, crête -1,5 dB).
set -e
cd "$(dirname "$0")/.."
python3 audio/generer-audio.py
ffmpeg -v error -y -i public/audio/bande-son.wav -af "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000" -c:a pcm_s16le public/audio/bande-son-norm.wav
mv public/audio/bande-son-norm.wav public/audio/bande-son.wav
ffmpeg -nostats -i public/audio/bande-son.wav -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):"
