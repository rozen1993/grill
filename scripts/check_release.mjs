// Only builds to tmp using a reserved, noncommercial domain. No network or deploy.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const domain = 'https://grillrent.example.invalid';
const directory = 'tmp/release-check';
const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs','build','--outDir',directory],{
  cwd: process.cwd(),
  env: {...process.env,PUBLIC_SITE_URL:domain,PUBLIC_LAUNCH_READY:'true',PUBLIC_FORM_ENDPOINT:'',PUBLIC_WHATSAPP_PHONE:''},
  encoding:'utf8',
});
if(result.status !== 0){console.error(result.stdout, result.stderr);process.exit(1);}
const read = file => readFileSync(join(directory,file),'utf8');
const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,21);
assert(urls.every(url=>url.startsWith(domain)));
assert(!urls.some(url=>/solicitud-recibida|demo|privacidad|condiciones/.test(url)));
assert(read('index.html').includes('content="index, follow"'));
assert(read('index.html').includes(`href="${domain}/"`));
for(const file of ['solicitud-recibida/index.html','privacidad/index.html','condiciones/index.html','404.html'])assert(read(file).includes('content="noindex, follow"'));
assert(read('robots.txt').includes(`Sitemap: ${domain}/sitemap.xml`));
assert(!readdirSync(directory).includes('demo'));
const report = {testDomain:domain,outputDirectory:directory,sitemapURLs:urls.length,canonical:true,indexableUsefulPages:true,excludedPrivateAndDraftPages:true,demosExcluded:true,issues:[]};
mkdirSync('docs/verification', { recursive: true });
writeFileSync('docs/verification/release-checks.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
