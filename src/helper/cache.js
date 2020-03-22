const { cache } = require('../config');

function refreshRes (stats, res) {
  const { maxAge, expires, cacheControl, lastModified, etag } = cache;

  if (expires) {
    res.setHeader('Expires', new Date(Date.now() + maxAge).toUTCString());
  }

  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if (etag) {
    res.setHeader('Etag', 'abc' + stats.size);
  }
}

module.exports = function isFresh (stats, req, res) {
  refreshRes(stats, res);
  const lastModified = req.headers['if-last-modified'];
  const etag = req.headers['if-none-match'];

  if (!lastModified && !etag) {
    console.log(1);
    return false;
  }

  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    console.log(2);
    return false;
  }

  if (etag && etag !== res.getHeader('Etag')) {
    return false;
  }

  return true;
};
