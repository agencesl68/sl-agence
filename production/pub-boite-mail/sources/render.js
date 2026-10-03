// node render.js stills 1,5.5      -> stills/t_<t>.png
// node render.js video out.mp4 i0 i1   (indices d'images à 60 i/s ; sortie 30 i/s avec flou de mouvement)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const TL = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json'), 'utf8'));
(async () => {
  const [mode, arg, a0, a1] = process.argv.slice(2);
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: Number(process.env.DSF || 1) });
  page.on('pageerror', e => console.log('[err]', e.message));
  page.on('console', m => console.log('[page]', m.text()));
  await page.addInitScript(tl => { window.TL = tl; }, TL);
  await page.goto('file://' + path.join(__dirname, 'pub.html'));
  await page.evaluate(() => window.ready);
  if (mode === 'stills') {
    fs.mkdirSync(path.join(__dirname, 'stills'), { recursive: true });
    for (const t of arg.split(',').map(Number)) {
      await page.evaluate(t => window.render(t), t);
      await page.screenshot({ path: path.join(__dirname, 'stills', `t_${t.toFixed(2)}.png`) });
    }
  } else {
    const n = Math.round(TL.duration * TL.fps), i0 = Number(a0 || 0), i1 = Number(a1 || n);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(TL.fps), '-i', '-',
      '-vf', "tmix=frames=2,select='eq(mod(n\\,2)\\,1)',setpts=N/30/TB", '-r', '30',
      '-c:v', 'libx264', '-preset', process.env.DSF ? 'veryfast' : 'medium', '-crf', process.env.DSF ? '12' : '14', '-pix_fmt', 'yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', arg],
      { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = i0; i < i1; i++) {
      await page.evaluate(t => window.render(t), i / TL.fps);
      const buf = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 120 === 0) console.log(`frame ${i}/${i1}`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
