// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/
'use strict';

const version = 'v0.1.0::';
const staticCacheName = version + 'static';
const pagesCacheName = 'pages';
const imagesCacheName = 'images';

const cacheList = [
    staticCacheName,
    pagesCacheName,
    imagesCacheName
];

const offlinePages = [
    '/',
    '/blog/',
    '/speaking/'
];

function updateStaticCache() {
    return caches.open(staticCacheName)
        .then( cache => {
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll([
                '/style.css'
            ]);
        });
}

function stashInCache(cacheName, request, response) {
    caches.open(cacheName)
        .then( cache => cache.put(request, response) );
}


self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache()
      .then( () => self.skipWaiting() )
  );
});



self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') {
      return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get('Accept').includes('text/html')) {

      event.respondWith(
          fetch(request)
              .then( response => {
                  // NETWORK
                  // Stash a copy of this page in the pages cache
                  let copy = response.clone();
                  if (offlinePages.includes(url.pathname) || offlinePages.includes(url.pathname + '/')) {
                      stashInCache(staticCacheName, request, copy);
                  } else {
                      stashInCache(pagesCacheName, request, copy);
                  }
                  return response;
              })
              .catch( () => {
                  // CACHE or FALLBACK
                  return caches.match(request)
                      .then( response => response );
              })
      );
      return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  event.respondWith(
      caches.match(request)
          .then(response => {
              // CACHE
              return response || fetch(request)
                  .then( response => {
                      // NETWORK
                      // If the request is for an image, stash a copy of this image in the images cache
                      if (request.headers.get('Accept').includes('image')) {
                          let copy = response.clone();
                          stashInCache(imagesCacheName, request, copy);
                      }
                      return response;
                  })
                  .catch( () => {
                      // OFFLINE
                      // If the request is for an image, show an offline placeholder
                      if (request.headers.get('Accept').includes('image')) {
                          return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
                      }
                  });
          })
  );
});
