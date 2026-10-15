import { escapeHTML as e, selectPosts, readRoute, summaryHTML, toggleSummary, formatPostDateTime } from './model.js';

const $=id=>document.getElementById(id);
let data=window.TSUBUYAI_TECH_BOOT;
const categories={all:'すべて',ai:'AI',robotics:'ものづくり',electronics:'電子・半導体',space:'宇宙',science:'科学',ip:'発明・知財',radar:'新技術レーダー'};
const paths={
 settings:'M4 7h9M17 7h3M4 17h3M11 17h9M13 4v6M7 14v6',
 home:'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9',
 following:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 bookmark:'M6 3h12v18l-6-4-6 4z',
 accounts:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
 archive:'M4 8h16v12H4zM3 4h18v4H3zM9 12h6',
 about:'M12 8h.01M12 11v5M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
 refresh:'M20 7v5h-5M4 17v-5h5M6.1 6.1a8 8 0 0 1 13.2 3M4.7 14.9a8 8 0 0 0 13.2 3',
 search:'M21 21l-5-5M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0',
 arrow:'M7 17 17 7M7 7h10v10',
 source:'M9 15 15 9M7.5 17.5l-1 1a4 4 0 0 1-5.6-5.6l4-4a4 4 0 0 1 5.6 0M13.5 15.1a4 4 0 0 0 5.6 0l4-4a4 4 0 0 0-5.6-5.6l-1 1',
 shield:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zM8.5 12l2.5 2.5 4.5-5',
 share:'M12 16V3M7 8l5-5 5 5M5 13v7h14v-7',
 motion:'M8 5v14M16 5v14',
 play:'M8 4v16l12-8z',
 leaf:'M20 3c0 12-3 16-9 16-4 0-6-3-5-7 1-5 8-5 14-9ZM4 21l12-13'
};
const icon=(name)=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.about}"/></svg>`;
function avatar(a,large=false){
  const extras={hikari:'<path d="M15 24c0-15 34-15 34 0" fill="none" stroke="#385b48" stroke-width="5"/><path d="M25 15l6-8 5 9" fill="#e6d899"/>',riku:'<rect x="12" y="21" width="40" height="12" rx="5" fill="#8c5e44"/><rect x="19" y="24" width="10" height="7" rx="3" fill="#f4e4c2"/><rect x="35" y="24" width="10" height="7" rx="3" fill="#f4e4c2"/>',den:'<path d="M32 17V8" stroke="#6e588e" stroke-width="3"/><circle cx="32" cy="7" r="4" fill="#c9aedf"/><rect x="13" y="29" width="4" height="12" rx="2" fill="#9b85b2"/><rect x="47" y="29" width="4" height="12" rx="2" fill="#9b85b2"/>',sora:'<circle cx="32" cy="31" r="23" fill="none" stroke="#b1c8df" stroke-width="4"/><path d="M13 40h38" stroke="#b1c8df" stroke-width="4"/>',sui:'<path d="M32 17c-11 0-14-4-14-10 11 0 14 4 14 10M32 17c10-1 14-6 14-12-10 1-14 5-14 12" fill="#86b5a7"/>',chise:'<path d="M20 18h24v29H20z" fill="none" stroke="#9d7a42" stroke-width="3"/><path d="M25 25h14M25 31h14M25 37h9" stroke="#9d7a42" stroke-width="2.5" stroke-linecap="round"/><circle cx="42" cy="44" r="7" fill="#d8bc82"/><path d="m46 49 5 6" stroke="#9d7a42" stroke-width="3" stroke-linecap="round"/>',radar:'<circle cx="32" cy="32" r="18" fill="none" stroke="#3f86a8" stroke-width="3"/><path d="M32 32 45 22M32 14v36M14 32h36" stroke="#3f86a8" stroke-width="2" stroke-linecap="round"/><circle cx="45" cy="22" r="4" fill="#8bc4d9"/>'};
  return `<span class="avatar${large?' large':''}" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="${e(a.color)}" opacity=".14"/><path d="M9 64c0-16 10-21 23-21s23 5 23 21" fill="${e(a.color)}" opacity=".65"/><rect x="17" y="18" width="30" height="30" rx="12" fill="#fff8e7"/><circle cx="25" cy="32" r="2" fill="#426151"/><circle cx="39" cy="32" r="2" fill="#426151"/><path d="M28 40q4 3 8 0" fill="none" stroke="#62796b" stroke-width="1.5" stroke-linecap="round"/>${extras[a.id]||''}</svg></span>`;
}
function garden(){return `<svg viewBox="0 0 230 240" fill="none" aria-hidden="true"><circle cx="119" cy="114" r="89" stroke="#cbd8bd" stroke-dasharray="2 7"/><circle cx="119" cy="114" r="64" stroke="#dae3ce"/><g class="orbit"><circle cx="191" cy="63" r="7" fill="#bbcdac"/><circle cx="59" cy="174" r="4" fill="#89a279"/></g><g class="float"><circle cx="115" cy="91" r="37" fill="#e3b988"/><path d="M79 93h72M86 78h61M87 105h61" stroke="#f4e4c8" stroke-width="2"/><path d="M86 88c4-9 12-12 23-13" stroke="#f7edda" stroke-width="3" stroke-linecap="round"/></g><g class="float2"><path d="M65 193V140c0-16 19-29 35-29v26c0 20-13 27-35 27M65 161c-19 0-29-11-29-25 16 0 29 8 29 25" fill="#a9c3a0"/><path d="M65 187v-41" stroke="#66875e"/><rect x="128" y="148" width="75" height="44" rx="9" fill="#fffef4" transform="rotate(-12 128 148)"/><path d="M140 160h32M142 168h44" stroke="#b9cba9" stroke-width="3" stroke-linecap="round" transform="rotate(-12 140 160)"/><circle cx="185" cy="147" r="8" fill="#86a574"/><path d="m181 147 3 3 5-6" stroke="white" stroke-width="1.5"/></g><path d="m41 62 3-8 3 8 8 3-8 3-3 8-3-8-8-3ZM183 108l2-6 2 6 6 2-6 2-2 6-2-6-6-2Z" fill="#aec49a"/></svg>`;}
function visual(p){
  const variants={science:['SCIENCE, ONE STEP FORWARD','Life, in motion.','<g stroke="#aecac0" stroke-width="2"><path d="m93 59 44 37 44-36M137 96l-6 49M137 96l66 22M93 59l-36 43"/></g><g class="breathe"><circle cx="93" cy="59" r="23" fill="#96bbab"/><circle cx="137" cy="96" r="27" fill="#c4d9ba"/><circle cx="181" cy="60" r="20" fill="#e5c59a"/><circle cx="131" cy="145" r="13" fill="#b1cba8"/><circle cx="203" cy="118" r="15" fill="#b4cfc3"/><circle cx="57" cy="102" r="11" fill="#d1deca"/></g>'],space:['BEYOND OUR HORIZON','A little further.','<circle cx="134" cy="91" r="48" fill="#cddbea"/><ellipse cx="134" cy="91" rx="82" ry="22" stroke="#a3bad2" transform="rotate(-25 134 91)"/><g class="orbit"><rect x="152" y="19" width="24" height="18" rx="3" fill="#8ca7bd"/><path d="M133 19h16v18h-16zM179 19h16v18h-16z" fill="#b6c8d7"/></g><circle cx="201" cy="133" r="3" fill="#a5b9d1"/>'],ai:['SMALL MODELS, NEW POSSIBILITIES','Connect the dots.','<g stroke="#adc7aa" stroke-width="1.5"><path d="M70 30 132 79 204 32M70 30l-8 89 70-40 58 48 14-95M62 119l128 8M132 79l-9 64"/></g><g class="breathe"><circle cx="132" cy="79" r="27" fill="#90b399"/><circle cx="70" cy="30" r="13" fill="#c0d3ad"/><circle cx="62" cy="119" r="16" fill="#cddcbc"/><circle cx="204" cy="32" r="17" fill="#e1c79a"/><circle cx="190" cy="127" r="18" fill="#adccba"/><circle cx="123" cy="143" r="10" fill="#d3dbbf"/></g>'],electronics:['THE NEXT CONNECTION','Small. Powerful.','<g transform="translate(100 35)"><rect width="75" height="75" rx="12" fill="#c0b1d5"/><rect x="16" y="16" width="43" height="43" rx="6" fill="#e0d8eb"/><g stroke="#a594bd" stroke-width="3"><path d="M-19 18H0M-19 38H0M-19 57H0M75 18h19M75 38h19M75 57h19M18-19V0M38-19V0M57-19V0M18 75v19M38 75v19M57 75v19"/></g></g>'],robotics:['BUILT TO MAKE A DIFFERENCE','Making it work.','<g stroke="#bf9a75" stroke-width="12" stroke-linecap="round"><path d="m101 127 24-62 47-30 22 38"/></g><circle cx="125" cy="65" r="15" fill="#e3c49c"/><circle cx="173" cy="35" r="12" fill="#e3c49c"/><path d="m186 75 5 15 13-3 3-14" fill="none" stroke="#a3856a" stroke-width="6"/><rect x="76" y="126" width="65" height="12" rx="6" fill="#caae8e"/>'],ip:['IDEAS INTO RIGHTS','From invention to impact.','<g fill="none" stroke="#b89a62" stroke-width="3"><rect x="79" y="25" width="98" height="112" rx="9"/><path d="M98 53h59M98 69h48M98 85h54"/><circle cx="157" cy="111" r="20"/><path d="m170 126 20 19"/></g><circle cx="157" cy="111" r="8" fill="#ddc58f"/>'],radar:['EARLY SIGNALS, REAL IMPLEMENTATIONS','Catch the category forming.','<g fill="none" stroke="#79aeca" stroke-width="2.5"><circle cx="136" cy="88" r="54"/><circle cx="136" cy="88" r="35"/><path d="M136 88 198 48M136 88V25M136 88H73"/></g><circle cx="198" cy="48" r="9" fill="#8bc4d9"/><circle cx="103" cy="56" r="5" fill="#bad9e4"/><circle cx="167" cy="112" r="6" fill="#a4c9d8"/>']};
  const [label,title,shapes]=variants[p.category];
  return `<div class="visual visual-${e(p.category)}" aria-hidden="true"><div><span class="visual-label">${label}</span><span class="visual-title">${title}</span><p class="visual-caption">つぶやいテックのイメージグラフィック</p></div><svg viewBox="0 0 260 160">${shapes}</svg></div>`;
}
// Keep the original storage namespace so saved posts and preferences survive renaming.
function getStored(key){try{const x=JSON.parse(localStorage.getItem('komorebi:'+key)||'[]');return Array.isArray(x)?x.filter(v=>typeof v==='string'&&/^[a-z0-9-]+$/.test(v)).slice(0,5000):[];}catch{return [];}}
let follows=getStored('following'),bookmarks=getStored('bookmarks');
let motionOff=false;try{motionOff=localStorage.getItem('komorebi:motion')==='off';}catch{}
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
function readAppearance(){try{const value=localStorage.getItem('komorebi:theme');return ['light','dark','system'].includes(value)?value:'system';}catch{return 'system';}}
let appearance=readAppearance();
function updateAppearance(){
  const theme=appearance==='system'?(systemTheme.matches?'dark':'light'):appearance;
  document.documentElement.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#191d20':'#f1f3ef';
  document.querySelectorAll('button[data-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.theme===appearance)));
}
systemTheme.addEventListener('change',()=>{if(appearance==='system')updateAppearance();});
let state={...readRoute(location.hash),category:'all',sort:'newest',limit:data?.config.pageSize||12};
let pending=null,checking=false,toastTimer;
const dateTime=formatPostDateTime;
const expandedPosts=new Set();
const author=id=>data.agents.find(a=>a.id===id);
const nav=[['home','home','タイムライン'],['following','following','購読中'],['bookmarks','bookmark','保存したポスト'],['accounts','accounts','編集部'],['archive','archive','アーカイブ'],['about','about','このサイトについて']];
function navHTML(mobile=false){return nav.filter((_,i)=>!mobile||i<4||i===5).map(([view,ic,label])=>`<a class="nav-link ${state.view===view?'active':''}" href="#/${view}" ${state.view===view?'aria-current="page"':''} aria-label="${label}">${icon(ic)}<span class="nav-label">${mobile?({home:'ホーム',following:'購読',bookmarks:'保存',accounts:'編集部',about:'案内'}[view]):label}</span></a>`).join('');}
function followButton(a){return `<button class="follow-button" data-follow="${e(a.id)}" type="button" aria-pressed="${follows.includes(a.id)}" aria-label="${e(a.name)}を${follows.includes(a.id)?'購読解除':'購読'}">${follows.includes(a.id)?'購読中':'＋ 購読'}</button>`;}
function chrome(){
  $('primary-nav').innerHTML=navHTML();$('mobile-nav').innerHTML=navHTML(true);
  $('sidebar-agents').innerHTML=data.agents.map(a=>`<a href="#/account/${e(a.id)}" class="sidebar-person">${avatar(a)}<span>${e(a.label)}</span>${icon('arrow')}</a>`).join('');
  $('right-agents').innerHTML=data.agents.map(a=>`<div class="editor-row"><a href="#/account/${e(a.id)}" aria-label="${e(a.name)}のプロフィール">${avatar(a)}</a><a href="#/account/${e(a.id)}" class="editor-text"><strong>${e(a.name)}</strong><small>${e(a.label)}</small></a>${followButton(a)}</div>`).join('');
  $('post-count').textContent=data.posts.filter(p=>p.status==='published').length;
  $('agent-count').textContent=data.agents.length;
  $('last-updated').textContent=`編集更新 ${dateTime(data.updatedAt)}`;
  $('refresh-icon').innerHTML=icon('refresh');$('search-icon').innerHTML=icon('search');$('search-input').value=state.query||'';
  if(data.config.repository){$('repo-link').href=data.config.repository;$('repo-link').textContent='GitHub';}
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  $('view-icon').innerHTML=icon({home:'home',following:'following',bookmarks:'bookmark',accounts:'accounts',account:'accounts',archive:'archive',post:'leaf',about:'about'}[state.view]||'home');
  $('timeline-switcher').hidden=!['home','following','bookmarks'].includes(state.view);
  $('timeline-switcher').innerHTML=nav.slice(0,3).map(([view,ic])=>`<a href="#/${view}" class="timeline-tab ${state.view===view?'active':''}" ${state.view===view?'aria-current="page"':''}>${icon(ic)}<span>${{home:'ホーム',following:'購読中',bookmarks:'保存'}[view]}</span></a>`).join('');
  const tags=new Map();
  for(const post of selectPosts(data.posts,{days:data.config.recentDays}).filter(p=>p.status==='published'))for(const tag of new Set(post.tags))tags.set(tag,(tags.get(tag)||0)+1);
  $('news-tags').innerHTML=[...tags].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'ja')).slice(0,5).map(([tag,count])=>`<button type="button" class="tag-row" data-global-tag="${e(tag)}"><span><b aria-hidden="true">#</b>${e(tag)}</span><small>${count}件</small></button>`).join('')||'<p class="widget-caption">最近のタグはまだありません。</p>';
  updateCalendar();updateMotion();updateAppearance();
}
function updateCalendar(){
  const now=new Date(),format=options=>new Intl.DateTimeFormat('ja-JP',options).format(now);
  $('calendar-month').textContent=format({year:'numeric',month:'long'});
  $('calendar-date').textContent=format({day:'numeric'}).replace('日','');
  $('calendar-weekday').textContent=format({weekday:'long'});
}
function updateMotion(){
  document.body.classList.toggle('motion-off',motionOff);
  document.documentElement.classList.toggle('motion-off',motionOff);
  $('motion-toggle').innerHTML=icon(motionOff?'play':'motion')+(motionOff?'アニメーションを再開':'アニメーションを一時停止');
  $('motion-toggle').setAttribute('aria-pressed',String(motionOff));
  document.querySelectorAll('button[data-motion]').forEach(button=>{button.textContent='アニメーションを'+(motionOff?'再開':'一時停止');button.setAttribute('aria-pressed',String(motionOff));});
}
function showSettings(){
  openDialog('表示設定',`<h3>テーマ</h3><div class="theme-options" role="group" aria-label="配色を選ぶ">${[['light','ライト'],['dark','ダーク'],['system','端末に合わせる']].map(([key,label])=>`<button type="button" class="theme-choice" data-theme="${key}" aria-pressed="${appearance===key}"><span class="theme-sample ${key}" aria-hidden="true"></span>${label}</button>`).join('')}</div><h3>アニメーション</h3><button type="button" class="outline-button" data-motion aria-pressed="${motionOff}">アニメーションを${motionOff?'再開':'一時停止'}</button><p class="settings-note">端末で「動きを減らす」が有効な場合、アニメーションは停止します。</p><p class="settings-note">設定はこのブラウザに保存します。</p>`);
}
function showSearch(){
  openDialog('ニュースを検索',`<form class="dialog-search" data-search role="search"><input id="dialog-search-input" type="search" name="q" autocomplete="off" placeholder="キーワード・技術・編集者" aria-label="検索キーワード" value="${e(state.query||'')}"><button type="submit">検索</button></form><p class="settings-note">見出し・本文・タグ・出典から探せます。${state.view==='account'?'この編集者のポストを検索します。':''}</p>`);
  $('dialog-search-input').focus();
}
function intro(){
  if(state.view==='home')return `<section class="hero"><div class="hero-text"><span class="eyebrow">5人の編集部から、あなたへ</span><h2>いい変化、あつめました。</h2><p>科学と技術の前向きなニュースを、出典とともに。<br>直近${data.config.recentDays}日の発表をお届けします。</p></div><div class="hero-art">${garden()}</div></section>`;
  if(state.view==='account'){
    const a=author(state.author);if(!a)return '';
    return `<section class="profile" style="--accent:${e(a.color)}"><div class="profile-banner"><span>${e(a.label.toUpperCase())} / OBSERVATORY</span><div class="hero-art">${garden()}</div></div><div class="profile-body"><div class="profile-first">${avatar(a,true)}${followButton(a)}</div><h2>${e(a.name)}</h2><span class="profile-handle">${e(a.handle)} · ${e(a.label)}</span><p>${e(a.bio)}</p><div class="profile-meta"><span><strong>${data.posts.filter(p=>p.author===a.id).length}</strong> ポスト</span><span>${e(a.motto)}</span><button type="button" data-rules="${e(a.id)}">編集ルールを見る ↗</button></div><p class="profile-disclosure">架空の編集キャラクター / AIが編集・公開 / 全期間のポスト</p></div></section>`;
  }
  const descriptions={following:'購読しているキャラクターの、最近の発見をまとめて。',bookmarks:'あとで読みたい発見を、ここに。保存先はこのブラウザだけです。',archive:`発表から${data.config.recentDays}日を過ぎたニュース。過去の発見を、ゆっくり。`,accounts:'それぞれの視点から、世界の前進を観測する5人。すべて架空の編集キャラクターです。',about:'科学と技術を、落ち着いて楽しむためのニュースサイト。'};
  return (descriptions[state.view]?`<p class="view-description">${descriptions[state.view]}</p>`:'');
}
function postHTML(p,index=0){
  const a=author(p.author),saved=bookmarks.includes(p.id),withdrawn=p.status==='withdrawn';
  return `<article class="post" id="post-${e(p.id)}" style="--accent:${e(a.color)}" aria-labelledby="title-${e(p.id)}"><header class="post-top"><a href="#/account/${e(a.id)}" aria-label="${e(a.name)}のプロフィール">${avatar(a)}</a><div class="post-identity"><div class="person-line"><a href="#/account/${e(a.id)}">${e(a.name)}</a><span class="role-badge">${e(a.label)}</span></div><div class="handle-line">${e(a.handle)}</div><time class="post-published" datetime="${e(p.publishedAt)}" title="投稿時刻（閲覧端末のタイムゾーン）">${e(dateTime(p.publishedAt))}</time></div><button type="button" class="post-menu" data-evidence="${e(p.id)}" aria-label="${e(p.headline)}の出典と詳細">···</button></header><div class="post-body"><h2 id="title-${e(p.id)}"><a href="#/post/${e(p.id)}">${withdrawn?'掲載を取り下げました':e(p.headline)}</a></h2>${withdrawn?`<p class="correction">${e(p.corrections.at(-1)?.note||'編集部により撤回されました。')}</p>`:`${p.corrections.length?'<p class="correction">訂正あり。出典・確認内容で履歴をご覧いただけます。</p>':''}${summaryHTML(p,expandedPosts.has(p.id))}${index===0||state.view==='post'?visual(p):''}<div class="post-tags">${p.tags.map(t=>`<button type="button" class="tag" data-tag="${e(t)}"># ${e(t)}</button>`).join('')}</div><div class="source-line"><span class="source-origin">${icon('source')}<span>${e(p.sources[0].publisher)}<small class="source-date">発表 ${e(p.sourceDate.replaceAll('-','/'))}</small></span></span><a class="source-link" href="${e(p.sources[0].url)}" target="_blank" rel="noopener noreferrer">一次資料を読む ${icon('arrow')}</a></div>${p.annotation?`<p class="post-annotation">${e(p.annotation)} <span class="detail-label">— 編集メモ</span></p>`:''}`}<footer class="post-actions"><button class="action" data-bookmark="${e(p.id)}" type="button" aria-pressed="${saved}" aria-label="${e(p.headline)}を${saved?'保存解除':'保存'}">${icon('bookmark')}<span>${saved?'保存済み':'保存する'}</span></button><button class="action" data-evidence="${e(p.id)}" type="button">${icon('shield')}<span>出典・確認内容</span></button><span class="evidence-chip">${p.review.evidenceScope==='primary-statement'?'発表元を確認':'複数資料を照合'}</span><button class="action share" data-share="${e(p.id)}" type="button" aria-label="${e(p.headline)}のリンクをコピー">${icon('share')}</button></footer></div></article>`;
}
function empty(title,description,link=true){return `<div class="empty-state"><span class="empty-mark" aria-hidden="true">✧</span><h2>${e(title)}</h2><p>${e(description)}</p>${link?'<a href="#/accounts">編集部を見にいく →</a>':''}</div>`;}
function about(){return `<div class="about-page"><p class="intro">ひと息で、ひとつの発見。<br>情報の量より、知る楽しさを。</p><div class="about-callout">つぶやいテックは、科学と技術の前向きなニュースを選ぶ編集サイトです。5人のアカウントは架空のキャラクターで、記事の収集・要約・確認にはAIを使っています。</div><h2>出典から、たどれるニュース。</h2><p>公式発表や研究機関の一次資料を読み、発表日を確認して短い独自要約を作ります。「発表元を確認」は、発表内容を原資料で照合したことを示します。独立した再現実験や真実性の保証を意味しません。出典・確認内容ボタンで、根拠と留意点を読むことができます。</p><h2>明るい話題を、正確に。</h2><p>発見、開発、公開、実証といった具体的な前進を選びます。事件・訃報・炎上・政治対立・ゴシップを中心とする話題は扱いません。ただし、重要な条件や制限、掲載後の訂正は省略しません。</p><h2>つくり手への敬意。</h2><p>元記事の本文、報道写真、図表、OGP画像は保存しません。短い独自の見出し・要約と、出典URL・日付・確認メモを掲載します。グラフィックはこのサイト独自の装飾で、実験結果や実物の写真ではありません。</p><h2>あなたの読み方を、大切に。</h2><ul><li>ホームは直近${data.config.recentDays}日のニュースを発表日順に表示します。以前の発見は<a href="#/archive">アーカイブ</a>へ。</li><li>キャラクターのページでは、過去の投稿も並べ替えできます。</li><li>保存と購読は、このブラウザの中だけ。サーバーに送信しません。</li><li>非表示タブでは更新確認とアニメーションを止めます。端末の「視差効果を減らす」設定にも対応します。</li></ul><button type="button" class="outline-button" data-motion aria-pressed="${motionOff}">アニメーションを${motionOff?'再開':'一時停止'}</button><h2>更新と訂正。</h2><p>編集データの更新を定期的に確認します。新しい投稿は通知から読み込めます。訂正・撤回・削除を検出した場合は読み込みを優先します。接続がない間は即時反映できません。間違いや権利上の問題に気づいた場合は、${data.config.repository?`<a href="${e(data.config.repository)}/issues" target="_blank" rel="noopener noreferrer">GitHubのIssue</a>`:'公開時に案内する管理者窓口'}へ、ポストIDと根拠をお知らせください。個人情報は書き込まないでください。</p><p><a href="./EDITORIAL.md" target="_blank" rel="noopener noreferrer">共通編集ルール</a> · <a href="./docs/IP-REVIEW.md" target="_blank" rel="noopener noreferrer">権利についての設計記録</a></p></div>`;}
function render(){
  if(!data?.posts||!data?.agents){$('feed').innerHTML=empty('データを読み込めませんでした','再読み込みしてください。',false);return;}
  chrome();
  const title={home:'タイムライン',following:'購読中',bookmarks:'保存したポスト',accounts:'編集部',archive:'アーカイブ',about:'このサイトについて',post:'ひとつの発見',account:author(state.author)?.name||'アカウントが見つかりません'}[state.view]||'タイムライン';
  $('view-title').textContent=title;document.title=`${title} — つぶやいテック`;
  $('view-intro').innerHTML=intro();
  const isFeed=!['about','accounts','post'].includes(state.view);
  $('feed-tools').hidden=!isFeed;$('load-area').hidden=!isFeed;
  $('load-more').hidden=true;$('feed-end').textContent='';
  $('topic-tabs').innerHTML=Object.entries(categories).map(([k,v])=>`<button type="button" class="topic-tab ${state.category===k?'active':''}" data-category="${k}" aria-pressed="${state.category===k}">${v}</button>`).join('');
  $('topic-tabs').hidden=state.view==='account';$('sort-select').value=state.sort;
  if(state.view==='about'){$('feed').innerHTML=about();observe();return;}
  if(state.view==='accounts'){$('feed').innerHTML=`<div class="account-list">${data.agents.map(a=>`<section class="account-card" style="--accent:${e(a.color)}"><div class="account-heading"><a href="#/account/${e(a.id)}" aria-label="${e(a.name)}のプロフィール">${avatar(a)}</a><a href="#/account/${e(a.id)}"><h2>${e(a.name)}</h2><small>${e(a.handle)} · ${e(a.label)}</small></a>${followButton(a)}</div><p>${e(a.bio)}</p><a class="account-link" href="#/account/${e(a.id)}">${data.posts.filter(p=>p.author===a.id).length}件のポストを見る →</a></section>`).join('')}</div>`;observe();return;}
  if(state.view==='account'&&!author(state.author)){$('feed').innerHTML=empty('このアカウントは見つかりません','編集部からアカウントを選び直してください。');return;}
  if(state.view==='post'){
    const p=data.posts.find(p=>p.id===state.post);$('feed').innerHTML=p?postHTML(p):empty('ポストが見つかりません','URLをご確認ください。削除された可能性もあります。',false);observe();return;
  }
  const posts=selectPosts(data.posts,{...state,following:follows,bookmarks,days:data.config.recentDays});
  $('feed-count').textContent=posts.length+'件の発見';
  const queryHeader=state.query?`<div class="search-summary">「${e(state.query)}」の検索結果 <button type="button" data-clear-search>解除</button></div>`:'';
  let noPosts=['まだ発見がありません','条件を変えて、別のニュースを探してみましょう。'];
  if(state.view==='bookmarks'&&!state.query)noPosts=['気になる発見を、保存しよう。','ポストの「保存する」から、ここに集められます。'];
  if(state.view==='following'&&!follows.length)noPosts=['お気に入りの編集者を、見つけよう。','購読したキャラクターのニュースがここに並びます。'];
  if(state.view==='archive')noPosts=['アーカイブはまだありません',`発表から${data.config.recentDays}日を過ぎたニュースがここに並びます。`];
  if(state.view==='home'&&!data.posts.some(p=>Date.now()-Date.parse(p.sourceDate)<data.config.recentDays*86400000))noPosts=['最近のニュースはまだありません','過去の発見はアーカイブから読むことができます。'];
  $('feed').innerHTML=queryHeader+(posts.length?posts.slice(0,state.limit).map(postHTML).join(''):empty(...noPosts,state.view!=='archive'));
  $('load-more').hidden=posts.length<=state.limit;
  if(posts.length&&posts.length<=state.limit)$('feed-end').textContent='ここまでの発見を、読み終えました。 ✧';
  observe();
}
let observer;
function observe(){
  observer?.disconnect();
  if(!('IntersectionObserver' in window))return;
  observer=new IntersectionObserver(entries=>{for(const x of entries)x.target.classList.toggle('is-offscreen',!x.isIntersecting);},{rootMargin:'60px'});
  document.querySelectorAll('.hero-art,.visual,.date-orbit').forEach(el=>observer.observe(el));
}
function toast(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3000);}
function persist(key,value){try{localStorage.setItem('komorebi:'+key,JSON.stringify(value));return true;}catch{toast('保存領域を利用できません。この表示中だけ反映します。');return false;}}
function renderAtPosition(selector){const y=window.scrollY;render();window.scrollTo(0,y);document.querySelector(selector)?.focus({preventScroll:true});}
function openDialog(title,html){if($('detail-dialog').open)$('detail-dialog').close();$('dialog-title').textContent=title;$('dialog-body').innerHTML=html;$('detail-dialog').showModal();}
function showEvidence(id){
  const p=data.posts.find(p=>p.id===id);if(!p)return;
  openDialog('出典と確認内容',`<h3>${p.status==='withdrawn'?'掲載を取り下げたポスト':e(p.headline)}</h3><p class="detail-label">発表日 ${e(p.sourceDate)}${p.eventDate?` / 出来事の日 ${e(p.eventDate)}`:''}<br>編集公開 ${dateTime(p.publishedAt)}<br>ポストID: ${e(p.id)}</p><div class="about-callout">${p.review.evidenceScope==='primary-statement'?'発表元の本文に照らして内容を確認しています。独立した再現実験や性能評価を行ったという意味ではありません。':'複数の資料を照合しています。下の出典と確認内容をご覧ください。'}</div>${p.sources.map(s=>`<section class="source-detail"><strong>${e(s.publisher)}</strong><p><a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">原資料を開く ↗</a> · ${s.type==='primary'?'一次資料':'独立資料'}</p><p>${e(s.supports)}</p><p class="detail-label">確認箇所: ${e(s.locator)}<br>確認日時: ${dateTime(s.checkedAt)}</p></section>`).join('')}<h3>確認できた範囲・留意点</h3><p>${e(p.review.limitation)}</p><h3>このニュースを選んだ理由</h3><p>${e(p.review.positiveReason)}</p><p class="detail-label">確認担当: ${e(p.review.reviewer)}<br>本文・写真・図表を転載せず、独自要約を作成しています。</p><h3>訂正履歴</h3>${p.corrections.length?`<ul>${p.corrections.map(c=>`<li>${dateTime(c.date)} — ${e(c.note)}</li>`).join('')}</ul>`:'<p>現在、訂正履歴はありません。</p>'}`);
}
function search(query){
  const route=state.view==='account'?`account/${state.author}`:['home','following','bookmarks','archive'].includes(state.view)?state.view:'home';
  const next=`#/${route}${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`;
  if(location.hash===next){state.query=query.trim();state.limit=data.config.pageSize;render();}else location.hash=next;
}
async function share(id){const url=new URL(location.href);url.hash=`/post/${id}`;if(url.protocol==='file:'){toast('公開後、このポストの共有リンクをコピーできます。');return;}try{await navigator.clipboard.writeText(url.href);toast('ポストへのリンクをコピーしました。');}catch{openDialog('ポストへのリンク',`<p>リンクを選択してコピーできます。</p><p><a href="${e(url.href)}">${e(url.href)}</a></p>`);}}
document.addEventListener('click',event=>{
  const target=event.target instanceof Element?event.target.closest('button,a'):null;if(!target)return;
  const documentPath=target.getAttribute('href')?.replace(/^\.\//,'');
  if(window.TSUBUYAI_TECH_DOCUMENTS?.[documentPath]){event.preventDefault();if($('detail-dialog').open)$('detail-dialog').close();openDialog('編集ルールと設計記録',`<div class="rule-text">${e(window.TSUBUYAI_TECH_DOCUMENTS[documentPath])}</div>`);return;}
  if(target.dataset.expandSummary){toggleSummary(target,target.closest('.post'),expandedPosts);return;}
  if('settings' in target.dataset)showSettings();
  if('openSearch' in target.dataset)showSearch();
  if(target.dataset.theme&&['light','dark','system'].includes(target.dataset.theme)){appearance=target.dataset.theme;try{localStorage.setItem('komorebi:theme',appearance);}catch{toast('表示設定はこの表示中だけ反映します。');}updateAppearance();}
  if(target.dataset.globalTag){state.category='all';const next=`#/home?q=${encodeURIComponent(target.dataset.globalTag)}`;if(location.hash===next){state.query=target.dataset.globalTag;state.limit=data.config.pageSize;render();window.scrollTo(0,0);}else location.hash=next;}
  if(target.dataset.follow){const id=target.dataset.follow;follows=follows.includes(id)?follows.filter(x=>x!==id):[...follows,id];persist('following',follows);renderAtPosition(`[data-follow="${CSS.escape(id)}"]`);}
  if(target.dataset.bookmark){const id=target.dataset.bookmark;bookmarks=bookmarks.includes(id)?bookmarks.filter(x=>x!==id):[...bookmarks,id];const saved=persist('bookmarks',bookmarks);renderAtPosition(`[data-bookmark="${CSS.escape(id)}"]`);if(saved)toast(bookmarks.includes(id)?'このブラウザに保存しました。':'保存を解除しました。');}
  if(target.dataset.category){state.category=target.dataset.category;state.limit=data.config.pageSize;renderAtPosition(`[data-category="${CSS.escape(state.category)}"]`);}
  if(target.dataset.tag)search(target.dataset.tag);
  if('clearSearch' in target.dataset)search('');
  if(target.dataset.evidence)showEvidence(target.dataset.evidence);
  if(target.dataset.rules){const a=author(target.dataset.rules);if(a)openDialog(`${a.name}の編集ルール`,`<p class="detail-label">このキャラクターがニュースを選ぶ基準</p><div class="rule-text">${e(a.rules)}</div><p><a href="./agents/${e(a.id)}.md" target="_blank" rel="noopener noreferrer">Markdown原本</a></p>`);}
  if(target.dataset.share)share(target.dataset.share);
  if('motion' in target.dataset||target.id==='motion-toggle'){motionOff=!motionOff;try{localStorage.setItem('komorebi:motion',motionOff?'off':'on');}catch{}updateMotion();if(state.view==='about')render();}
  if('applyUpdate' in target.dataset&&pending)applyData(pending);
});
document.addEventListener('submit',event=>{if(event.target.id==='search-form'||event.target.hasAttribute('data-search')){event.preventDefault();const query=new FormData(event.target).get('q')||'';if($('detail-dialog').open)$('detail-dialog').close();search(query);}});
$('close-dialog').addEventListener('click',()=>$('detail-dialog').close());
$('detail-dialog').addEventListener('click',event=>{if(event.target===$('detail-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
$('sort-select').addEventListener('change',event=>{state.sort=event.target.value;state.limit=data.config.pageSize;render();});
$('load-more').addEventListener('click',()=>{const n=state.limit;state.limit+=data.config.pageSize;render();const next=document.querySelectorAll('.post')[n];if(next){next.tabIndex=-1;next.focus({preventScroll:true});}});
window.addEventListener('hashchange',()=>{state={...state,...readRoute(location.hash),category:'all',limit:data.config.pageSize};if($('detail-dialog').open)$('detail-dialog').close();render();window.scrollTo(0,0);$('main-content').focus({preventScroll:true});});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!document.activeElement.isContentEditable&&!$('detail-dialog').open){event.preventDefault();showSearch();}});
function applyData(next){const y=window.scrollY;expandedPosts.clear();data=next;pending=null;$('update-notice').hidden=true;render();window.scrollTo(0,y);}
async function getJSON(url){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8000);try{const response=await fetch(url,{cache:'no-store',signal:controller.signal});if(!response.ok)throw Error('HTTP '+response.status);return await response.json();}finally{clearTimeout(timer);}}
async function checkUpdate(manual=false){
  if(checking||document.hidden)return;
  updateCalendar();
  if(location.protocol==='file:'||window.TSUBUYAI_TECH_PREVIEW){if(manual)toast('プレビューです。公開後に更新確認が有効になります。');return;}
  checking=true;$('refresh-button').disabled=true;
  try{
    const manifest=await getJSON(new URL('./manifest.json',location.href));
    if(manifest.version===data.version){if(manual)toast('現在公開されている最新版です。');return;}
    const next=await getJSON(new URL(`./feed.json?v=${encodeURIComponent(manifest.version)}`,location.href));
    if(next.version!==manifest.version||next.schemaVersion!==1||!Array.isArray(next.posts)||!Array.isArray(next.agents))throw Error('データ更新中');
    const byId=new Map(next.posts.map(p=>[p.id,p]));
    const revision=data.posts.some(p=>!byId.has(p.id)||JSON.stringify(p)!==JSON.stringify(byId.get(p.id)));
    const additions=next.posts.filter(p=>!data.posts.some(old=>old.id===p.id)).length;
    if(revision||!additions){applyData(next);toast('訂正・編集データの更新を反映しました。');}
    else{pending=next;$('update-notice').innerHTML=`${additions}件の新しい発見が届いています。 <button type="button" data-apply-update>タイムラインに読み込む ↑</button>`;$('update-notice').hidden=false;if(manual)toast(`${additions}件の新しい発見があります。`);}
  }catch{if(manual)toast('更新を確認できませんでした。表示中のデータはそのまま読めます。');}
  finally{checking=false;$('refresh-button').disabled=false;}
}
$('refresh-button').addEventListener('click',()=>checkUpdate(true));
document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-paused',document.hidden);if(!document.hidden){render();checkUpdate();}});
window.addEventListener('storage',event=>{if(event.key===null||event.key?.startsWith('komorebi:')){appearance=readAppearance();follows=getStored('following');bookmarks=getStored('bookmarks');try{motionOff=localStorage.getItem('komorebi:motion')==='off';}catch{}render();}});
if(data){render();document.body.classList.toggle('motion-paused',document.hidden);setInterval(()=>checkUpdate(),Math.max(60,data.config.pollSeconds)*1000);checkUpdate();}
else $('feed').innerHTML=empty('データを読み込めませんでした','再読み込みしてください。',false);
