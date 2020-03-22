module.exports = {
  rootPath: process.cwd(),
  hostName: '127.0.0.1',
  port: 5000,
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
};
