// Service worker : met l'app en cache pour qu'elle marche hors ligne (métro, avion).
// Incrémente VERSION à chaque modification des fichiers pour forcer la mise à jour.
const VERSION = "english-quest-v2";
const FILES = [
  "./", "index.html", "manifest.json", "css/style.css",
  "js/data/vocab.js", "js/data/phrases.js", "js/data/grammar.js", "js/data/verbs.js",
  "js/store.js", "js/srs.js", "js/check.js", "js/speech.js", "js/cards.js", "js/app.js",
  "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord (pour avoir les mises à jour), cache si hors ligne
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
