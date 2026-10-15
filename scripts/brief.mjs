import { readFile, readdir } from 'node:fs/promises';
import { digest, parseMarkdown } from './content.mjs';
const selected=process.argv[2]||'all';
const policy=await readFile('EDITORIAL.md','utf8');
console.log(policy+'\n\n共通方針 SHA-256: '+digest(policy));
for(const f of (await readdir('agents')).filter(f=>f.endsWith('.md')).sort()) {
  const text=await readFile(`agents/${f}`,'utf8');const a=parseMarkdown(text);
  if(selected==='all'||selected===a.meta.id) console.log(`\n${text}\n担当ルール SHA-256: ${a.ruleHash}`);
}
console.log('\n既存ポスト（重複を確認）');
for(const f of (await readdir('content/posts')).filter(f=>f.endsWith('.md'))) {
  const {meta:p}=parseMarkdown(await readFile(`content/posts/${f}`,'utf8'));
  console.log(`${p.id} | ${p.sourceDate} | ${p.headline} | ${p.sources[0].url}`);
}
