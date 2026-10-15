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
