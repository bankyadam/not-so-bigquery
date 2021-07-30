'use strict';

const fs = require('fs');
const https = require('https');
const app = require('./application');

const getCertificate = function() {
  const key = fs.readFileSync(__dirname + '/../docker/app/cert/key.pem');
  const cert = fs.readFileSync(__dirname + '/../docker/app/cert/cert.pem');

  return { key, cert };
};

module.exports = function(port, hostname) {
  const server = https.createServer(Object.assign({}, getCertificate()), app);
  server.listen(port, hostname, () => {
    console.log(`App listening at https://localhost:${port}`);
  });
};
