// File: service-worker.js

const CACHE_NAME = "resume-builder-cache-v2";
const urlsToCache = [
	"/",
	"/index.html",
	"/index.css",
	"/script.js",
	"/randomscript.js",
	"/manifest.json",
	"/template/template1.html",
	"/template/template2.html",
	"/template/template2.css",
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(async (cache) => {
			console.log("Opened cache");
			try {
				await cache.addAll(urlsToCache);
			} catch (err) {
				console.warn("Skipping some files during cache:", err);
			}
		})
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME];
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

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Return cached file if available
			if (response) return response;

			return fetch(event.request)
				.then((response) => {
					// Ensure valid response before caching
					if (
						!response ||
						response.status !== 200 ||
						response.type !== "basic"
					) {
						return response;
					}

					// Clone response and store in cache
					let responseToCache = response.clone();
					caches
						.open(CACHE_NAME)
						.then((cache) => cache.put(event.request, responseToCache));

					return response;
				})
				.catch(() => {
					console.warn("Failed to fetch:", event.request.url);
				});
		})
	);
});
