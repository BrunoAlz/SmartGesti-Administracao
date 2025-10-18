// Service Worker MINIMALISTA para evitar problemas com refresh
const CACHE_NAME = "odonto-premium-v3";
const urlsToCache = [
  "/manifest.json",
  "/images/dentista16.png",
  "/images/dentista24.png",
  "/images/dentista32.png",
  "/images/dentista64.png",
  "/images/dentista128.png",
  "/images/dentista256.png",
  "/images/dentista512.png",
];

// Instalar
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativar
self.addEventListener("activate", (event) => {
  self.clients.claim();

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - ULTRA PERMISSIVO
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 🚨 NUNCA interferir com documentos HTML ou requests importantes
  if (
    // Documentos HTML (páginas)
    event.request.destination === "document" ||
    // Requests de API
    url.pathname.includes("/api/") ||
    // Arquivos de desenvolvimento
    url.pathname.includes("webpack") ||
    url.pathname.includes("hot-update") ||
    url.pathname.includes("sockjs-node") ||
    url.search.includes("hot") ||
    // Métodos que não são GET
    event.request.method !== "GET" ||
    // JavaScript/CSS principais
    url.pathname.includes("/static/js/") ||
    url.pathname.includes("/static/css/")
  ) {
    return; // Deixa o browser lidar normalmente
  }

  // Só cacheia imagens e manifests
  if (
    url.pathname.includes("/images/") ||
    url.pathname.includes("manifest.json")
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((fetchResponse) => {
          if (fetchResponse && fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        });
      })
    );
  }
});

// Listener para notificações push (futuro)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nova notificação do Odonto Premium",
    icon: "/images/dentista256.png",
    badge: "/images/dentista64.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver detalhes",
        icon: "/images/dentista128.png",
      },
      {
        action: "close",
        title: "Fechar",
        icon: "/images/dentista128.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Odonto Premium", options)
  );
});

// Listener para cliques em notificações
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
