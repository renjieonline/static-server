const path = require('path');

const mimeTypes= {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'xml': 'text/xml',
  'txt': 'text/plain',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'swf': 'application/x-shockwave-flash',
  'gif': 'image/gif',
  'ico': 'image/x-icon',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'wav': 'audio/x-wave',
  'wma': 'audio/x-ms-wma',
  'wmv': 'audio/x-ms-wmv'
};

module.exports = (filePath) => {
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase();

  if (!ext) {
    ext = filePath;
  }

  return mimeTypes[ext] || mimeTypes['txt'];
};
