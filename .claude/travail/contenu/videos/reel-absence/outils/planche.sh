#!/bin/bash
# Planche-contact : outils/planche.sh <video> <sortie.png> <image1> <image2> ... (numéros d'images à 30 i/s)
v=$1; o=$2; shift 2; d=$(mktemp -d); i=0
for f in "$@"; do
  ffmpeg -v error -y -i "$v" -vf "select=eq(n\,$f),scale=360:-1,drawtext=text='$f':x=8:y=8:fontsize=22:fontcolor=yellow" -frames:v 1 "$d/$(printf %03d $i).png"; i=$((i+1))
done
n=$#; cols=$(( n < 5 ? n : 5 )); rows=$(( (n + cols - 1) / cols ))
ffmpeg -v error -y -framerate 1 -i "$d/%03d.png" -vf "tile=${cols}x${rows}:padding=4:color=0x333333" -frames:v 1 "$o"; rm -rf "$d"
