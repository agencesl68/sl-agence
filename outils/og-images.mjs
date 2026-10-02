// Génère les images de partage (1200×630) listées dans og-pages.json.
// Usage, depuis la racine du site : node outils/og-images.mjs   (nécessite Playwright)
import { chromium } from 'playwright';
import fs from 'fs';
const root=process.cwd();
const font='data:font/woff2;base64,'+fs.readFileSync(root+'/fonts/geist-latin.woff2').toString('base64');
const logo='data:image/png;base64,'+fs.readFileSync(root+'/img/sl-monogramme.png').toString('base64');
const pages=JSON.parse(fs.readFileSync(root+'/outils/og-pages.json','utf8'));
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1200,height:630}});
for(const pg of pages){
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:G;src:url(${font}) format('woff2');font-weight:100 900}
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#3c4f3b;color:#fff;font-family:G,sans-serif;padding:78px 84px 62px;position:relative;overflow:hidden}
  body:after{content:"";position:absolute;right:-180px;bottom:-260px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(169,196,159,.22),transparent 65%)}
  .k{font-size:21px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#a9c49f}
  h1{position:absolute;left:84px;bottom:150px;font-size:${pg.size||66}px;line-height:1.06;font-weight:500;letter-spacing:-.035em;max-width:820px}
  h1 em{font-style:normal;color:#dfe8d8;opacity:.8}
  .logo{position:absolute;right:84px;top:70px;width:150px;height:173px;background:url(${logo}) center/contain no-repeat}
  .foot{position:absolute;left:84px;right:84px;bottom:58px;border-top:1px solid rgba(255,255,255,.28);padding-top:26px;display:flex;justify-content:space-between;font-size:24px}
  .foot span{color:rgba(255,255,255,.66)}
  </style></head><body><div class="k">${pg.kicker}</div><h1>${pg.title}</h1><div class="logo"></div>
  <div class="foot"><b style="font-weight:500">${pg.left||'SL Agence · slagence.fr'}</b><span>${pg.right||'Devis gratuit sous 24 h · 07 67 08 19 43'}</span></div></body></html>`);
  await p.waitForTimeout(150);
  await p.screenshot({path:root+'/'+pg.out});
  console.log('ok',pg.out);
}
await b.close();
