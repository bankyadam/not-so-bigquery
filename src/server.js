'use strict';

const http = require('http');
const app = require('./application');

module.exports = function(port, hostname) {
  const server = http.createServer(app);
  server.listen(port, hostname, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};
