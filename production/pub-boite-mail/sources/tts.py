import certifi, sys, asyncio
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts
async def main():
    lines=[l.strip() for l in open('lines.txt',encoding='utf-8') if l.strip()]
    for i,l in enumerate(lines,1):
        await edge_tts.Communicate(l, "fr-FR-HenriNeural", rate="-4%", pitch="-2Hz").save(f"vo/l{i}.mp3")
asyncio.run(main())
