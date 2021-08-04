'use strict';

const fs = require('fs');
const https = require('https');
const app = require('./application');

const getCertificate = function() {
  const key = fs.readFileSync(__dirname + '/../docker/app/cert/key.pem');
  const cert = fs.readFileSync(__dirname + '/../docker/app/cert/cert.pem');

  return { key, cert };
};

const listenHttps = (port, hostname, callback) => {
  const server = https.createServer(Object.assign({}, getCertificate()), app);
  server.listen(port, hostname, callback);
}

const listenHttp = (port, hostname, callback) => {
  app.listen(port, callback)
}

const isHttps = (process.env.HTTPS == 'true')
const listenFn = isHttps ? listenHttps : listenHttp;

module.exports = function(port, hostname) {
  listenFn(port, hostname, () => {
    console.log(`App listening at http${isHttps ? 's' : ''}://localhost:${port}`)
  })
};
