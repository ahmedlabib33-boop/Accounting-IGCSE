// Offline support for the Accounting 0452 app.
// Pages and lesson/mock content: network first, falling back to the saved copy when offline.
// Built files under /_next/static never change, so they are served from the cache first.
// Marking, the AI Coach and other POST requests always need the network.

const VERSION = "v1";
const SHELL = `shell-${VERSION}`;
const CONTENT = `content-${VERSION}`;
const STATIC = `static-${VERSION}`;

const CONTENT_URLS = [
  "/api/content?type=summary",
  "/api/content?type=learning&subject=Accounting",
  "/api/content?type=exams&subject=Accounting",
  "/api/content?type=structured",
];

async function precache() {
  const shell = await caches.open(SHELL);
  await shell.addAll(["/", "/manifest.webmanifest", "/icon.svg", "/icon-192.png", "/accounting-revision.html"]).catch(() => {});
  const content = await caches.open(CONTENT);
  await Promise.all(CONTENT_URLS.map((url) => content.add(url).catch(() => {})));
  // Save every mock paper too, so they open without internet.
  try {
    const exams = await (await fetch("/api/content?type=exams&subject=Accounting")).json();
    await Promise.all((exams.exams || []).map((exam) => content.add(`/api/content?type=exam&subject=Accounting&examId=${encodeURIComponent(exam.id)}`).catch(() => {})));
    const papers = await (await fetch("/api/content?type=structured")).json();
    await Promise.all((papers.papers || []).map((paper) => content.add(`/api/content?type=structured-paper&examId=${encodeURIComponent(paper.id)}`).catch(() => {})));
  } catch { /* Content is cached again as it is used. */ }
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  const keep = new Set([SHELL, CONTENT, STATIC]);
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => !keep.has(key)).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const saved = await cache.match(request) || (request.mode === "navigate" ? await caches.match("/") : null);
    return saved || new Response(JSON.stringify({ error: "You're offline and this hasn't been saved yet." }), { status: 503, headers: { "Content-Type": "application/json" } });
  }
}

async function cacheFirst(request) {
  const saved = await caches.match(request);
  if (saved) return saved;
  const response = await fetch(request);
  if (response.ok) (await caches.open(STATIC)).put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_next/static/")) { event.respondWith(cacheFirst(request)); return; }
  if (url.pathname === "/api/content") { event.respondWith(networkFirst(request, CONTENT)); return; }
  if (url.pathname.startsWith("/api/")) return;
  // Sign-in, email links and the admin console always need the live server.
  if (url.pathname.startsWith("/login") || url.pathname.startsWith("/auth/") || url.pathname.startsWith("/admin")) return;
  if (request.mode === "navigate" || url.pathname.match(/\.(png|svg|webmanifest|html)$/)) event.respondWith(networkFirst(request, SHELL));
});
