const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/', // Pastikan ini mengarah ke root situs Anda
  '/index.html', // Jika Anda punya file HTML utama
  '/app.js', // File JavaScript utama
  '/style.css', // Jika Anda punya stylesheet
  // Tambahkan file lain yang diperlukan, misalnya gambar, font, dll.
];

// Install event: caching file-file penting
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Menyimpan cache:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: menghapus cache lama jika ada
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: mengembalikan cache jika ada, atau fetch dari jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Jika ada di cache, kembalikan
        }
        return fetch(event.request); // Kalau tidak, fetch ke jaringan
      })
      .catch(() => {
        // Jika offline dan tidak ditemukan cache, bisa tambahkan fallback
        // Contoh fallback: gambar default, halaman offline, dll.
      })
  );
});
