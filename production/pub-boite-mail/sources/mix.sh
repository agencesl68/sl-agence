#!/usr/bin/env bash
# Voix témoin -> vo_track.wav, mix avec musique/effets, normalisation -14 LUFS, mux avec la vidéo muette.
set -euo pipefail
VO=${1:-vo_track.wav}   # remplacer par la piste du comédien (40 s, mêmes positions)
ffmpeg -y -v error -i "$VO" -i music.wav -i sfx.wav -filter_complex \
 "[1]volume=-7dB[m];[2]volume=-6dB[s];[0][m][s]amix=inputs=3:normalize=0,afade=t=out:st=38.6:d=1.4[a]" -map "[a]" -ar 48000 mix_raw.wav
J=$(ffmpeg -i mix_raw.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p')
MI=$(echo "$J" | python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -y -v error -i mix_raw.wav -af "loudnorm=I=-14:TP=-1.5:LRA=11:$MI:linear=true" -ar 48000 audio_final.wav
ffmpeg -y -v error -i video_mute.mp4 -i audio_final.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 18 -profile:v high -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a aac -b:a 256k -shortest -movflags +faststart sl-agence-boite-mail-9x16.mp4
echo "OK -> sl-agence-boite-mail-9x16.mp4"
