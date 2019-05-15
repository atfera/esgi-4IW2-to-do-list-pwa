module.exports = {
  "globDirectory": "./",
  "importWorkboxFrom": "local",
  "skipWaiting": true,
  "globIgnores": [
    "node_modules/**/*",
    "package*",
    "workbox-4.2.0",
    "workbox-config.js"
  ],
  "runtimeCaching": [
    {
      "urlPattern": /\.(?:png|gif|jpg|jpeg|svg)$/,
      "handler": "CacheFirst",
      "options": {
        "cacheName": "images",
      }
    }
  ],
  "globPatterns": [
    "**/*.{json,jpg,html,js,css}"
  ],
  "swDest": "service-worker.js"
};