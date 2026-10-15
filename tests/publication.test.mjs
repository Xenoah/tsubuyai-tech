import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadContent, validatePost, parseMarkdown, sourceURL } from '../scripts/content.mjs';
import { selectPosts, readRoute, escapeHTML, isRecent } from '../src/model.js';
const root=new URL('..',import.meta.url).pathname;
// Fixed unit-test fixtures stay independent of future additions/removals in the live feed.
const content=JSON.parse(await readFile(root+'tests/fixtures.json','utf8'));
const seed=content.posts.find(p=>p.meta.id==='20261013-atp-enzyme').meta;
const now=Date.parse(seed.publishedAt)+60000;
const p0=content.posts.find(p=>p.meta.id==='20261013-atp-enzyme');
const valid=p=>validatePost(p,content.agents,content.policyHash,now);
const mutate=fn=>{const p=structuredClone(p0);fn(p);return p;};
const viewPosts=content.posts.map(p=>({...p.meta,summary:p.body,authorName:content.agents.find(a=>a.meta.id===p.meta.author).meta.name}));
test('the seed collection is valid and each of five editors has a post',()=>{
  assert.equal(content.agents.length,5);assert.equal(content.posts.length,7);
  for(const a of content.agents)assert.ok(content.posts.some(p=>p.meta.author===a.meta.id));
});
test('the current editorial collection passes the publication gates',async()=>{
  const live=await loadContent(root);
  assert.ok(live.agents.length>0);
});
test('publication is blocked without a read primary source',()=>{
  assert.throws(()=>valid(mutate(p=>p.meta.review.checks.primaryRead=false)),/primaryRead/);
  assert.throws(()=>valid(mutate(p=>p.meta.sources[0].type='independent')),/一次資料/);
});
test('unapproved, deceptive and non-HTTPS source URLs are rejected',()=>{
  for(const url of ['https://riken.jp.evil.example/news','http://www.riken.jp/news','https://evil-riken.jp/news','https://user@www.riken.jp/news','https://www.riken.jp:444/news','javascript:alert(1)','https://www.riken.jp/news?utm_source=test']) assert.throws(()=>sourceURL(url,['riken.jp']));
  assert.equal(sourceURL('https://www.riken.jp/press/2026/',['riken.jp']),'https://www.riken.jp/press/2026');
});
test('stale editorial rules and off-topic assignment fail closed',()=>{
  assert.throws(()=>valid(mutate(p=>p.meta.review.policyHash='outdated')),/共通方針/);
  assert.throws(()=>valid(mutate(p=>p.meta.review.agentRuleHash='outdated')),/キャラ規則/);
  assert.throws(()=>valid(mutate(p=>p.meta.category='space')),/担当外/);
});
test('future dates, impossible dates, and stale source reviews fail',()=>{
  assert.throws(()=>valid(mutate(p=>p.meta.publishedAt='2099-01-01T00:00:00Z')),/未来/);
  assert.throws(()=>valid(mutate(p=>p.meta.publishedAt='2026-02-30T00:00:00Z')),/実在/);
  assert.throws(()=>valid(mutate(p=>p.meta.sources[0].checkedAt='2026-10-01T00:00:00Z')),/時系列|72時間/);
  assert.throws(()=>valid(mutate(p=>p.meta.sourceDate='2026-01-01')),/古い記事/);
});
test('copied media, raw HTML, unexpected fields, and long summaries are rejected',()=>{
  assert.throws(()=>valid(mutate(p=>p.meta.image='https://example.com/photo.jpg')),/未許可/);
  assert.throws(()=>valid(mutate(p=>p.body='<img src=x onerror=alert(1)>'.repeat(3))),/HTML/);
  assert.throws(()=>valid(mutate(p=>p.body='あ'.repeat(241))),/文字/);
  assert.throws(()=>valid(mutate(p=>p.meta.review.rights='copied')),/転載/);
});
test('independent-verification claims require an additional independent source',()=>{
  assert.throws(()=>valid(mutate(p=>p.meta.review.evidenceScope='independently-corroborated')),/裏付け/);
});
test('negative focus and undocumented withdrawal fail',()=>{
  assert.throws(()=>valid(mutate(p=>p.meta.headline='研究施設の不祥事についてのニュース')),/除外/);
  assert.throws(()=>valid(mutate(p=>p.meta.status='withdrawn')),/撤回理由/);
  const corrected=mutate(p=>{p.meta.status='withdrawn';p.meta.corrections=[{date:seed.publishedAt,note:'根拠の記述を再確認するため撤回しました。'}];});
  assert.doesNotThrow(()=>valid(corrected));
});
test('default feed and oldest feed are chronological by source announcement',()=>{
  const newest=selectPosts(viewPosts,{now});const oldest=selectPosts(viewPosts,{now,sort:'oldest'});
  assert.equal(newest[0].id,'20261013-atp-enzyme');
  assert.equal(oldest[0].id,'20260919-conductive-film');
  assert.deepEqual(oldest.map(p=>p.id),newest.map(p=>p.id).reverse());
});
test('account, follow, bookmark, category and multilingual search filters compose',()=>{
  assert.equal(selectPosts(viewPosts,{author:'sui',view:'account',now}).length,2);
  assert.equal(selectPosts(viewPosts,{view:'following',following:['sora'],now})[0].author,'sora');
  assert.equal(selectPosts(viewPosts,{view:'bookmarks',bookmarks:['20261006-embeddinggemma'],now})[0].author,'hikari');
  assert.equal(selectPosts(viewPosts,{category:'space',query:'太陽電池',now}).length,1);
  assert.equal(selectPosts(viewPosts,{query:'EMBEDDINGGEMMA',now}).length,1);
  assert.equal(selectPosts(viewPosts,{query:'存在しない語句',now}).length,0);
});
test('old posts leave latest feed without requiring a rebuild',()=>{
  const future=Date.parse('2026-12-01T00:00:00Z');
  assert.equal(selectPosts(viewPosts,{now:future}).length,0);
  assert.equal(selectPosts(viewPosts,{view:'archive',now:future}).length,7);
  assert.equal(selectPosts(viewPosts,{view:'account',author:'sui',now:future}).length,2);
  assert.equal(isRecent(viewPosts[0],future,30),false);
});
test('source count and correction-date sorting work without popularity scores',()=>{
  const custom=structuredClone(viewPosts);custom[0].sources.push({...custom[0].sources[0],id:'second'});
  assert.equal(selectPosts(custom,{view:'archive',now:Date.parse('2027-01-01'),sort:'sources'})[0].id,custom[0].id);
  custom[2].corrections=[{date:'2026-10-14T00:00:00Z',note:'訂正'}];
  assert.equal(selectPosts(custom,{now,sort:'updated'})[0].id,custom[2].id);
});
test('hash routes work under project Pages paths and escape untrusted content',()=>{
  assert.deepEqual(readRoute('#/account/sui?q=%E7%A7%91%E5%AD%A6'),{view:'account',author:'sui',query:'科学'});
  assert.equal(readRoute('#/post/20261013-atp-enzyme').post,'20261013-atp-enzyme');
  assert.equal(readRoute('#/nonsense').view,'home');
  assert.equal(escapeHTML('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');
});
