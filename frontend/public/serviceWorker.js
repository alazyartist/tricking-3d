const CACHE_NAME = "tricking-3d-v2";
const urlsToCache = [
  "index.html",
  "offline.html",
  // "Kerwood40.glb",
  // "Frank.glb",
  // "Andrew.glb",
  // "SceneBackground.glb",
];
const self = this;
//Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened Cache");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log("Didn't Add Cache", err))
  );
});
//Listen for Requests
// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then((cacheResponse) => {
// 			// console.log("event", event.request);
// 			// console.log("cacheRes", cacheResponse);
// 			return (
// 				cacheResponse ||
// 				fetch(event.request).catch(() => caches.match("offline.html"))
// 			);
// 		})
// 	);
// });

//Activate the Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
