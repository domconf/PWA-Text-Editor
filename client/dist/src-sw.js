const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
    cacheName: "page-cache",
    plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        new ExpirationPlugin({ maxAgeSeconds: 2592000 })
    ]
});

warmStrategyCache({
    urls: ["/index.html", "/"],
    strategy: pageCache
});

registerRoute(
    ({ request }) => request.mode === "navigate",
    ({ event }) => {
        return pageCache.handle({ event });
    }
);
