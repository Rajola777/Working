const CACHE_NAME = "venocyber-v1";

const urlsToCache = [
"/",
"/index.html",
"/home.css",
"/home.js",
"/games.html",
"/games.css",
"/games.js",
"/icons/icon-192.png",
"/icons/icon-512.png"
];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})

);

});
