/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "c6abc035ac1f723e92d80b861e9ccf5e"
  },
  {
    "url": "js/app.js",
    "revision": "9fcd1c2e1f156dd66379ce2dbcbdb122"
  },
  {
    "url": "js/assets/bootstrap.min.js",
    "revision": "e1d98d47689e00f8ecbc5d9f61bdb42e"
  },
  {
    "url": "js/assets/jquery-3.3.1.slim.min.js",
    "revision": "99b0a83cf1b0b1e2cb16041520e87641"
  },
  {
    "url": "js/assets/moment.min.js",
    "revision": "fa63b11cdcb66629116d5b465556cd41"
  },
  {
    "url": "manifest.json",
    "revision": "099e42c16acddd9a705c0f35bb58844c"
  },
  {
    "url": "styles/bootstrap.min.css",
    "revision": "a15c2ac3234aa8f6064ef9c1f7383c37"
  },
  {
    "url": "styles/styles.css",
    "revision": "dd014607a09d555f59f35acd3322f052"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [] }), 'GET');
