const path = require('path');
const fs = require('fs');

const Handlebars = require('handlebars');

const mime = require('./helper/mime');
const compress = require('./helper/compress');
const range = require('./helper/range');
const isFresh = require('./helper/cache');

const tplPath = path.join(__dirname, './template/dir.hbs');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = function route (req, res, filePath, conf) {
  const contentType = mime(filePath)
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`${filePath} is not a directory or path!`);
      return;
    }

    if (stats.isFile()) {
      res.setHeader('Content-Type', contentType);

      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      let rs;
      const { code, start, end } = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, { start, end });
      }
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res);
      }
      return rs.pipe(res);
    }

    if (stats.isDirectory()) {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end(err);
        return;
      }
      fs.readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const dir = path.relative(conf.rootPath, filePath);
        const data = {
          title: path.basename(filePath),
          dir: dir ? `/${dir}` : '',
          files
        }
        res.end(template(data));
      })
    }
  });
}
