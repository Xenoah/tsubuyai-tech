import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const CATEGORIES = ['ai', 'robotics', 'electronics', 'space', 'science'];
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
export const digest = text => createHash('sha256').update(text).digest('hex');
export const chars = text => [...text].length;
export function parseMarkdown(text, filename = 'Markdown') {
  const m = /^# [^\n]+\r?\n\s*```json\r?\n([\s\S]*?)\r?\n```\r?\n([\s\S]*)$/.exec(text);
  if (!m) throw Error(`${filename}: # 見出し、JSONコードブロック、本文の順に記述してください`);
  return { meta: JSON.parse(m[1]), body: m[2].trim(), ruleHash: digest(text), raw: text };
}
function assert(ok, message) { if (!ok) throw Error(message); }
function exactKeys(obj, allowed, label) {
  assert(obj && typeof obj === 'object' && !Array.isArray(obj), `${label}: オブジェクトが必要`);
  for (const k of Object.keys(obj)) assert(allowed.includes(k), `${label}: 未許可フィールド ${k}`);
}
function str(s, min, max, label) {
  assert(typeof s === 'string' && chars(s.trim()) >= min && chars(s) <= max, `${label}: ${min}〜${max}文字が必要`);
  assert(!/[<>\u0000-\u0008]/.test(s), `${label}: HTML/制御文字は不可`);
}
function date(s, label, now) {
  assert(typeof s === 'string' && ISO.test(s) && Number.isFinite(Date.parse(s)), `${label}: タイムゾーン付き日時が必要`);
  assert(new Date(s.slice(0,19)+'Z').toISOString().slice(0,19) === s.slice(0,19), `${label}: 実在しない日時`);
  assert(Date.parse(s) <= now + 300000, `${label}: 未来日時は不可`);
  return Date.parse(s);
}
export function sourceURL(value, domains) {
  const u = new URL(value);
  assert(u.protocol === 'https:' && !u.username && !u.password && !u.port, '出典は認証情報・ポートのないHTTPSのみ');
  assert(!u.hash && !u.search, '出典は追跡パラメータ・フラグメントのない正規URLを指定');
  assert(domains.some(d => u.hostname === d || u.hostname.endsWith(`.${d}`)), `未許可の出典ドメイン: ${u.hostname}`);
  assert(u.pathname !== '/', '記事単位の出典URLが必要');
  return u.href.replace(/\/$/, '');
}
export function validateAgent(agent) {
  const a = agent.meta;
  exactKeys(a, ['id','name','handle','category','label','color','bio','motto','allowedDomains','discovery','maxAgeDays','maxSummaryChars'], 'キャラクター');
  assert(ID.test(a.id), '不正なキャラクターID');
  assert(CATEGORIES.includes(a.category), '不正な担当分野');
  for (const k of ['name','handle','label','bio','motto']) str(a[k], 1, k === 'bio' ? 160 : 60, k);
  assert(/^@[a-z0-9_]+$/.test(a.handle), 'handleの形式が不正');
  assert(/^#[0-9a-f]{6}$/i.test(a.color), '色は6桁HEXのみ');
  assert(Array.isArray(a.allowedDomains) && a.allowedDomains.length > 0, '出典の許可ドメインが必要');
  for (const d of a.allowedDomains) assert(/^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(d) && !['com','co.jp','jp','org','net'].includes(d), '個別の出典ドメインが必要');
  assert(Number.isInteger(a.maxAgeDays) && a.maxAgeDays >= 1 && a.maxAgeDays <= 90, 'maxAgeDays: 1〜90');
  assert(Number.isInteger(a.maxSummaryChars) && a.maxSummaryChars >= 40 && a.maxSummaryChars <= 280, 'maxSummaryChars: 40〜280');
  assert(Array.isArray(a.discovery) && a.discovery.length > 0, '発見用ページが必要');
  for (const d of a.discovery) sourceURL(d, a.allowedDomains);
  assert(chars(agent.body) >= 100, '担当キャラの編集規則を記載してください');
  return a;
}
export function validatePost(post, agents, policyHash, now = Date.now()) {
  const p = post.meta;
  exactKeys(p, ['id','author','category','headline','publishedAt','sourceDate','eventDate','tags','status','kind','sources','review','corrections','annotation'], '記事');
  assert(ID.test(p.id), '不正な記事ID');
  const agent = agents.find(a => a.meta.id === p.author);
  assert(agent, `担当キャラクター不明: ${p.author}`);
  assert(p.category === agent.meta.category, '担当外分野の記事');
  str(p.headline, 8, 72, '独自見出し');
  str(post.body, 30, agent.meta.maxSummaryChars, '独自要約');
  assert(!/!\[|https?:\/\/|```|^#{1,6} /m.test(post.body), '本文は独自のプレーンテキスト要約のみ');
  assert(['published','withdrawn'].includes(p.status), '公開状態はpublished/withdrawn');
  assert(['announcement','research'].includes(p.kind), 'kindはannouncement/research');
  const published = date(p.publishedAt,'publishedAt',now);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(p.sourceDate) && new Date(p.sourceDate).toISOString().slice(0,10) === p.sourceDate, '出典の発表日が必要');
  const sourceDay = Date.parse(`${p.sourceDate}T00:00:00+09:00`);
  assert(sourceDay <= published, '発表より前に公開できません');
  assert(published - sourceDay <= (agent.meta.maxAgeDays + 1) * 86400000, '古い記事を新着として登録できません');
  if(p.eventDate !== null) assert(/^\d{4}-\d{2}-\d{2}$/.test(p.eventDate) && new Date(p.eventDate).toISOString().slice(0,10) === p.eventDate, 'eventDateの形式が不正');
  assert(Array.isArray(p.tags) && p.tags.length >= 1 && p.tags.length <= 5, 'タグは1〜5件');
  for(const tag of p.tags) str(tag, 1, 24, 'タグ');
  assert(Array.isArray(p.sources) && p.sources.length >= 1 && p.sources.length <= 4, '出典は1〜4件');
  const sourceIds = new Set();
  for(const s of p.sources) {
    exactKeys(s, ['id','publisher','url','type','checkedAt','locator','supports'], '出典');
    assert(ID.test(s.id) && !sourceIds.has(s.id), '出典ID重複/形式不正'); sourceIds.add(s.id);
    assert(['primary','independent'].includes(s.type), '出典種別が不正');
    sourceURL(s.url, agent.meta.allowedDomains);
    for(const k of ['publisher','locator','supports']) str(s[k], 2, k === 'supports' ? 220 : 100, k);
    const checked = date(s.checkedAt, 'checkedAt', now);
    assert(checked >= sourceDay && checked <= published + 300000, '出典確認の時系列が不正');
    assert(published - checked <= 72 * 3600000, '公開前72時間以内の出典確認が必要');
  }
  assert(p.sources.some(s => s.type === 'primary'), '一次資料が必要');
  const v=p.review;
  exactKeys(v, ['reviewer','reviewedAt','policyHash','agentRuleHash','evidenceScope','positiveReason','rights','checks','limitation'], 'レビュー');
  str(v.reviewer,2,80,'確認担当'); date(v.reviewedAt,'reviewedAt',now);
  assert(p.sources.every(s=>Date.parse(s.checkedAt)<=Date.parse(v.reviewedAt)), 'レビューは出典確認の後に実施');
  assert(Date.parse(v.reviewedAt) <= published + 300000 && published - Date.parse(v.reviewedAt) <= 72*3600000,'レビューは公開前72時間以内');
  assert(v.agentRuleHash === agent.ruleHash, 'キャラ規則が変更されています。全ポストを再確認してhashを更新');
  assert(v.policyHash === policyHash, '共通方針が変更されています。全ポストを再確認してhashを更新');
  assert(['primary-statement','independently-corroborated'].includes(v.evidenceScope), '検証範囲を明示してください');
  if(v.evidenceScope === 'independently-corroborated') assert(p.sources.some(s=>s.type==='independent') && new Set(p.sources.map(s=>new URL(s.url).hostname)).size>=2, '独立した裏付け資料が必要');
  assert(v.rights === 'original-summary-no-media', '本文・画像の転載は受け付けません');
  str(v.positiveReason,10,200,'掲載理由'); str(v.limitation,10,220,'留意点');
  exactKeys(v.checks,['primaryRead','dateChecked','claimsSupported','notMisleading','noNegativeFocus','rightsChecked','rulesRead'], '確認項目');
  for(const k of ['primaryRead','dateChecked','claimsSupported','notMisleading','noNegativeFocus','rightsChecked','rulesRead']) assert(v.checks[k]===true, `未確認: ${k}`);
  const blocked = /(?:訃報|逮捕|殺害|戦争|炎上|不祥事|大量解雇|倒産|犯罪被害|死者\d|流出事件)/;
  assert(!blocked.test(p.headline+' '+post.body), '除外対象の話題を検出。自動承認不可');
  assert(Array.isArray(p.corrections), '訂正履歴が必要');
  for(const c of p.corrections) {
    exactKeys(c,['date','note'],'訂正'); date(c.date,'訂正日時',now); str(c.note,5,200,'訂正内容');
  }
  if(p.status === 'withdrawn') assert(p.corrections.length > 0,'撤回理由を記録してください');
  if(p.annotation !== null) str(p.annotation, 3, 100, '編集メモ');
  return p;
}
async function markdowns(dir) {
  return Promise.all((await readdir(dir)).filter(f=>f.endsWith('.md')).sort().map(async f=>({...parseMarkdown(await readFile(path.join(dir,f),'utf8'),f), filename:f})));
}
export async function loadContent(root, now = Date.now()) {
  const policy = await readFile(path.join(root,'EDITORIAL.md'),'utf8');
  const agents = await markdowns(path.join(root,'agents'));
  const posts = await markdowns(path.join(root,'content/posts'));
  const policyHash = digest(policy);
  const ids=new Set(), urls=new Set(), agentIds=new Set(), handles=new Set();
  for(const a of agents) { validateAgent(a); assert(!agentIds.has(a.meta.id),'キャラID重複'); assert(!handles.has(a.meta.handle),'ハンドル重複');agentIds.add(a.meta.id);handles.add(a.meta.handle); }
  for(const p of posts) {
    validatePost(p,agents,policyHash,now);
    assert(!ids.has(p.meta.id),'記事ID重複'); ids.add(p.meta.id);
    const key=sourceURL(p.meta.sources.find(s=>s.type==='primary').url,agents.find(a=>a.meta.id===p.meta.author).meta.allowedDomains);
    assert(!urls.has(key),'一次出典が重複。同じ出来事は1ポストに統合'); urls.add(key);
  }
  return {policy,policyHash,agents,posts};
}
