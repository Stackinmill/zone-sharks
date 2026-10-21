// Network-first service worker: always try fresh data, fall back to cache offline.
const C='zs-v2';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  const isData=new URL(e.request.url).pathname.includes('/data/');
  e.respondWith(fetch(e.request,isData?{cache:'no-store'}:{}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request.url.split('?')[0],c));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
