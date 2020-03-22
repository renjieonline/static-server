const http = require('http');
const path = require('path');

// const chalk = require('chalk');

const conf = require('./config');
const route = require('./route');
const openUrl = require('./helper/open');

class Server {
  constructor (config) {
    this.conf = Object.assign({}, conf, config);
  }

  start () {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.rootPath, req.url);
      route(req, res, filePath, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostName,  ()=> {
      const address = `http://${this.conf.hostName}:${this.conf.port} `;
      // console.info(`Server started at ${chalk.green(address)}`);
      openUrl(address);
    });
  }
}

module.exports = Server;

