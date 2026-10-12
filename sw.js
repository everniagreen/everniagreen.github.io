/* LIFELINE v5.0 service worker – offline-first cache. © 2026 Evernia Green. All rights reserved. */
const CACHE = 'lifeline-5.0-96dfe20e13';
const FILES = ["./", "./index.html", "./apple-touch-icon.png", "./favicon-32.png", "./favicon.ico", "./icon-128.png", "./icon-144.png", "./icon-152.png", "./icon-192.png", "./icon-256.png", "./icon-384.png", "./icon-48.png", "./icon-512.png", "./icon-72.png", "./icon-96.png", "./icon-maskable-192.png", "./icon-maskable-512.png", "./manifest.webmanifest", "./shortcut-compass.png", "./shortcut-map.png", "./shortcut-phrases.png", "./shortcut-position.png", "./shortcut-sos.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())) });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('lifeline-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  e.respondWith(caches.match(r, {ignoreSearch: true}).then(m => m || fetch(r).then(res => {
    if (res && res.ok) { const cl = res.clone(); caches.open(CACHE).then(c => c.put(r, cl)) }
    return res
  }).catch(() => r.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting() });
