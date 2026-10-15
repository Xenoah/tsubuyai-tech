import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {summaryHTML,toggleSummary,formatPostDateTime,selectPosts} from '../src/model.js';
import {loadContent,validatePost,validateAgent,preservedReview} from '../scripts/content.mjs';
const root=new URL('..',import.meta.url).pathname;
const content=await loadContent(root);
const preservation=JSON.parse(await readFile(root+'content/review-preservation.json','utf8'));
// Fixed historical examples: adding or correcting live news must not freeze the feed.
const historical=JSON.parse(await readFile(root+'tests/fixtures.json','utf8'));
const seed=historical.posts[0];
const agent=content.agents.find(a=>a.meta.id===seed.meta.author);
const reviewed=()=>{
  const p=structuredClone(seed);
  p.meta.review.policyHash=content.policyHash;p.meta.review.agentRuleHash=agent.ruleHash;
  return p;
};
test('all five editors accept up to 2000 code points, never 2001',()=>{
  for(const a of content.agents){assert.equal(a.meta.maxSummaryChars,2000);assert.doesNotThrow(()=>validateAgent(a));}
  for(const length of [299,300,301,2000]){
    const p=reviewed();p.body='😀'.repeat(length);
    assert.doesNotThrow(()=>validatePost(p,content.agents,content.policyHash));
  }
  const tooLong=reviewed();tooLong.body='あ'.repeat(2001);
  assert.throws(()=>validatePost(tooLong,content.agents,content.policyHash),/文字/);
  const invalidAgent=structuredClone(agent);invalidAgent.meta.maxSummaryChars=2001;
  assert.throws(()=>validateAgent(invalidAgent),/2000/);
});
test('unchanged historical reviews survive only this exact policy migration',()=>{
  for(const p of historical.posts){
    const a=content.agents.find(a=>a.meta.id===p.meta.author);
    assert.equal(preservedReview(p,a,content.policyHash,preservation),true);
    assert.doesNotThrow(()=>validatePost(p,content.agents,content.policyHash,Date.now(),preservation));
  }
  for(const edit of [p=>p.body+='追記',p=>p.meta.review.reviewer='別の担当',p=>p.meta.id+='-new']){
    const p=structuredClone(seed);edit(p);
    assert.equal(preservedReview(p,agent,content.policyHash,preservation),false);
    assert.throws(()=>validatePost(p,content.agents,content.policyHash,Date.now(),preservation),/規則|方針/);
  }
  const newPost=reviewed();newPost.meta.id='20990101-test-fixture';
  assert.equal(preservedReview(newPost,agent,content.policyHash,preservation),false);
  assert.doesNotThrow(()=>validatePost(newPost,content.agents,content.policyHash,Date.now(),preservation));
  assert.equal(preservedReview(seed,agent,'future-policy',preservation),false);
  assert.equal(preservedReview(seed,{...agent,ruleHash:'future-rule'},content.policyHash,preservation),false);
});
test('300 characters stay fully visible; 301 characters get an accessible disclosure',()=>{
  const p={id:'test-post',status:'published',summary:'あ'.repeat(300)};
  assert.equal(summaryHTML(p),`<p class="post-summary">${p.summary}</p>`);
  p.summary+='終';
  const html=summaryHTML(p);
  assert.match(html,/aria-expanded="false"/);
  assert.match(html,/aria-controls="summary-rest-test-post"/);
  assert.match(html,/data-summary-rest hidden>終<\/span>/);
  assert.match(html,/すべてを表示する/);
  assert.match(summaryHTML(p,true),/aria-expanded="true"/);
  assert.match(summaryHTML(p,true),/data-summary-rest>終<\/span>/);
  assert.match(summaryHTML(p,true),/折りたたむ/);
});
test('emoji, newlines, HTML escaping, full-text search and withdrawals remain safe',()=>{
  const p={...seed.meta,summary:'😀'.repeat(300)+'<script>\n最後の語',authorName:'編集者'};
  const html=summaryHTML(p);
  assert.ok(html.includes('😀'.repeat(300)));
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;\n最後の語'));
  assert.equal(selectPosts([p],{view:'account',query:'最後の語'}).length,1);
  assert.equal(summaryHTML({...p,status:'withdrawn'},true),'');
});
test('expand and collapse change only the disclosure and retain the reading state',()=>{
  const rest={hidden:true},ellipsis={hidden:false},attributes={'aria-expanded':'false'};
  const button={dataset:{expandSummary:'test-post'},textContent:'すべてを表示する',getAttribute:k=>attributes[k],setAttribute:(k,v)=>attributes[k]=v};
  const article={querySelector:s=>s==='[data-summary-rest]'?rest:ellipsis};
  const expanded=new Set();
  toggleSummary(button,article,expanded);
  assert.equal(rest.hidden,false);assert.equal(ellipsis.hidden,true);
  assert.equal(attributes['aria-expanded'],'true');assert.equal(button.textContent,'折りたたむ');assert.ok(expanded.has('test-post'));
  toggleSummary(button,article,expanded);
  assert.equal(rest.hidden,true);assert.equal(ellipsis.hidden,false);
  assert.equal(attributes['aria-expanded'],'false');assert.equal(button.textContent,'すべてを表示する');assert.equal(expanded.size,0);
});
test('local timestamps include seconds, zone, midnight and date rollover',()=>{
  assert.equal(formatPostDateTime('2026-10-15T12:02:13Z','Asia/Tokyo'),'2026/10/15 21:02:13 JST');
  assert.equal(formatPostDateTime('2026-10-15T12:02:13Z','UTC'),'2026/10/15 12:02:13 UTC');
  assert.equal(formatPostDateTime('2026-10-15T15:00:00Z','Asia/Tokyo'),'2026/10/16 00:00:00 JST');
  assert.equal(formatPostDateTime('2026-01-01T00:00:00Z','America/Los_Angeles'),'2025/12/31 16:00:00 PST');
  assert.equal(formatPostDateTime('2026-01-15T12:02:13Z','America/New_York'),'2026/01/15 07:02:13 EST');
  assert.equal(formatPostDateTime('2026-07-15T12:02:13Z','America/New_York'),'2026/07/15 08:02:13 EDT');
  assert.equal(formatPostDateTime('2026-10-15T12:02:13Z','Asia/Kathmandu'),'2026/10/15 17:47:13 UTC+5:45');
});
test('omitting the time zone uses the viewing environment, not fixed JST',()=>{
  const moduleURL=new URL('../src/model.js',import.meta.url).href;
  for(const [TZ,expected] of [['UTC','2026/10/15 12:02:13 UTC'],['Asia/Tokyo','2026/10/15 21:02:13 JST']]){
    const result=execFileSync(process.execPath,['--input-type=module','-e',`import {formatPostDateTime} from ${JSON.stringify(moduleURL)};process.stdout.write(formatPostDateTime('2026-10-15T12:02:13Z'));`],{env:{...process.env,TZ},encoding:'utf8'});
    assert.equal(result,expected);
  }
});
