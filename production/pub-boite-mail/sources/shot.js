const { chromium } = require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});
for(const h of [1440,1350,1920]){const p=await b.newPage({viewport:{width:1080,height:h}});
await p.goto('file://'+path.resolve('cover.html')+'?h='+h);await p.evaluate(()=>window.ready);
await p.screenshot({path:`couverture-${h===1440?'3x4':h===1350?'4x5':'reel-9x16'}.png`});await p.close()}
await b.close()})();
