import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { loadContent, digest } from './content.mjs';

const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const {policy,policyHash,agents,posts}=await loadContent(root);
const config=JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
if(config.repository&&!/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(config.repository))throw Error('repositoryはGitHubリポジトリの正規URLにしてください');
if(!Number.isInteger(config.recentDays)||config.recentDays<1||config.recentDays>90)throw Error('recentDays must be 1..90');
if(!Number.isInteger(config.pageSize)||config.pageSize<1||config.pageSize>30)throw Error('pageSize must be 1..30');
if(!Number.isInteger(config.pollSeconds)||config.pollSeconds<60)throw Error('pollSeconds must be >= 60');
const updatedAt=posts.flatMap(p=>[p.meta.publishedAt,...p.meta.corrections.map(c=>c.date)]).sort().at(-1)||new Date().toISOString();
const payload={schemaVersion:1,config,updatedAt,policyHash,agents:agents.map(a=>({...a.meta,rules:a.body,ruleHash:a.ruleHash})),posts:posts.map(p=>({...p.meta,summary:p.meta.status==='withdrawn'?'':p.body,authorName:agents.find(a=>a.meta.id===p.meta.author).meta.name}))};
payload.version=digest(JSON.stringify(payload)).slice(0,20);
const json=JSON.stringify(payload);
console.log(`Content OK: ${agents.length} characters, ${posts.length} posts; content ${payload.version}`);
if(process.argv.includes('--check'))process.exit(0);
const dist=path.join(root,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
await cp(path.join(root,'src'),dist,{recursive:true});
await cp(path.join(root,'agents'),path.join(dist,'agents'),{recursive:true});
await writeFile(path.join(dist,'EDITORIAL.md'),policy);
await mkdir(path.join(dist,'docs'));
const ipReview=await readFile(path.join(root,'docs','IP-REVIEW.md'),'utf8');
await writeFile(path.join(dist,'docs','IP-REVIEW.md'),ipReview);
await writeFile(path.join(dist,'feed.json'),json);
await writeFile(path.join(dist,'manifest.json'),JSON.stringify({schemaVersion:1,version:payload.version,updatedAt,postCount:payload.posts.length}));
const boot='window.TSUBUYAI_TECH_BOOT='+json.replace(/</g,'\\u003c')+';';
await writeFile(path.join(dist,'bootstrap.js'),boot);
await writeFile(path.join(dist,'.nojekyll'),'');
const index=await readFile(path.join(root,'src/index.html'),'utf8');
const css=await readFile(path.join(root,'src/styles.css'),'utf8');
const theme=await readFile(path.join(root,'src/theme.js'),'utf8');
const model=(await readFile(path.join(root,'src/model.js'),'utf8')).replace(/^export /gm,'');
const app=(await readFile(path.join(root,'src/app.js'),'utf8')).replace(/^import [^\n]+\n/,'');
// The shareable preview is independent of remote APIs, external fonts, and libraries.
const docs={'EDITORIAL.md':policy,'docs/IP-REVIEW.md':ipReview,...Object.fromEntries(agents.map(a=>[`agents/${a.meta.id}.md`,a.raw]))};
const script=boot+'\nwindow.TSUBUYAI_TECH_PREVIEW=true;\nwindow.TSUBUYAI_TECH_DOCUMENTS='+JSON.stringify(docs).replace(/</g,'\\u003c')+';\n'+model+'\nconst e=escapeHTML;\n'+app;
const standalone=index.replace(/  <meta http-equiv="Content-Security-Policy"[^\n]+\n/,'')
 .replace(/  <link rel="icon"[^\n]+\n/,'')
 .replace(/  <script[^\n]+\n/g,'')
 .replace('  <link rel="stylesheet" href="./styles.css">',`  <script>${theme}</script>\n  <style>${css}</style>`)
 .replace('</body>',`<script type="module">${script.replace(/<\/script/gi,'<\\/script')}</script></body>`);
await writeFile(path.join(dist,'preview.html'),standalone);
await writeFile(path.join(dist,'404.html'),index);
const sizes={html:Buffer.byteLength(index),css:Buffer.byteLength(css),app:Buffer.byteLength(app),model:Buffer.byteLength(model),bootstrap:Buffer.byteLength(boot),theme:Buffer.byteLength(theme)};
const total=Object.values(sizes).reduce((a,b)=>a+b,0), compressed=[index,css,app,model,boot,theme].reduce((n,s)=>n+gzipSync(s).length,0);
if(total>350000)throw Error('初期転送の予算350KBを超えました。データ分割を検討してください');
console.log(`Static build OK: ${(total/1024).toFixed(1)} KiB raw / ${(compressed/1024).toFixed(1)} KiB gzip estimate, 0 runtime dependencies.`);
console.log('Output: dist/ (Pages), dist/preview.html (standalone preview)');
