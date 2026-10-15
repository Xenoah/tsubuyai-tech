export function escapeHTML(value='') {
  return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export function isRecent(p, now=Date.now(), days=30) {
  return now - Date.parse(`${p.sourceDate}T00:00:00+09:00`) <= days * 86400000;
}
export function selectPosts(posts, {view='home',author='',category='all',query='',sort='newest',following=[],bookmarks=[],days=30,now=Date.now()}={}) {
  const q=query.trim().toLocaleLowerCase('ja');
  const list=posts.filter(p=> {
    if(view==='archive' && isRecent(p,now,days)) return false;
    if(['home','following'].includes(view) && !isRecent(p,now,days)) return false;
    if(view==='following' && !following.includes(p.author)) return false;
    if(view==='bookmarks' && !bookmarks.includes(p.id)) return false;
    if(author && p.author!==author) return false;
    if(category!=='all' && p.category!==category) return false;
    if(q && ![p.headline,p.summary,...p.tags,p.authorName,...p.sources.map(s=>s.publisher)].join(' ').toLocaleLowerCase('ja').includes(q)) return false;
    return true;
  });
  const sourceTime = p=>Date.parse(`${p.sourceDate}T00:00:00+09:00`);
  return list.sort((a,b)=>{
    const t=sourceTime(b)-sourceTime(a) || Date.parse(b.publishedAt)-Date.parse(a.publishedAt) || a.id.localeCompare(b.id);
    if(sort==='oldest') return -t;
    if(sort==='sources') return b.sources.length-a.sources.length || t;
    if(sort==='updated') return Date.parse(b.corrections.at(-1)?.date||b.publishedAt)-Date.parse(a.corrections.at(-1)?.date||a.publishedAt) || t;
    return t;
  });
}
export function readRoute(hash) {
  const [pathname,qs=''] = hash.replace(/^#/,'').split('?');
  const [type,id='']=pathname.split('/').filter(Boolean);
  const query=new URLSearchParams(qs).get('q') || '';
  if(type==='account') return {view:'account',author:id,query};
  if(type==='post') return {view:'post',post:id,query};
  return {view:['home','following','bookmarks','accounts','archive','about'].includes(type)?type:'home',author:'',query};
}

export const POST_PREVIEW_CHARS = 300;
export function summaryHTML(post, expanded = false) {
  if (post.status === 'withdrawn') return '';
  const points = [...post.summary];
  if (points.length <= POST_PREVIEW_CHARS) return `<p class="post-summary">${escapeHTML(post.summary)}</p>`;
  const id = escapeHTML(post.id);
  return `<p class="post-summary" id="summary-${id}">${escapeHTML(points.slice(0,POST_PREVIEW_CHARS).join(''))}<span data-summary-ellipsis${expanded?' hidden':''} aria-hidden="true">…</span><span id="summary-rest-${id}" data-summary-rest${expanded?'':' hidden'}>${escapeHTML(points.slice(POST_PREVIEW_CHARS).join(''))}</span></p><button type="button" class="summary-toggle" data-expand-summary="${id}" aria-expanded="${expanded}" aria-controls="summary-rest-${id}">${expanded?'折りたたむ':'すべてを表示する'}</button>`;
}
export function toggleSummary(button, article, expandedPosts) {
  const id=button.dataset.expandSummary;
  const rest=article.querySelector('[data-summary-rest]');
  const ellipsis=article.querySelector('[data-summary-ellipsis]');
  if(!rest || !ellipsis) return;
  const expanded=button.getAttribute('aria-expanded') !== 'true';
  if(expanded) expandedPosts.add(id); else expandedPosts.delete(id);
  rest.hidden=!expanded;ellipsis.hidden=expanded;
  button.setAttribute('aria-expanded',String(expanded));
  button.textContent=expanded?'折りたたむ':'すべてを表示する';
}
const timeFormatters=new Map();
export function formatPostDateTime(value, timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) {
  const instant=new Date(value);
  if(!Number.isFinite(instant.getTime())) return '日時不明';
  if(!timeFormatters.has(timeZone)) timeFormatters.set(timeZone,new Intl.DateTimeFormat('en-US',{
    timeZone,calendar:'gregory',numberingSystem:'latn',year:'numeric',month:'2-digit',day:'2-digit',
    hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23',timeZoneName:'short'
  }));
  const formatter=timeFormatters.get(timeZone);
  const parts=Object.fromEntries(formatter.formatToParts(instant).map(p=>[p.type,p.value]));
  const zone=formatter.resolvedOptions().timeZone==='Asia/Tokyo'?'JST':parts.timeZoneName.replace(/^GMT/,'UTC');
  return `${parts.year}/${parts.month}/${parts.day} ${parts.hour}:${parts.minute}:${parts.second} ${zone}`;
}
