'use strict';

require('dotenv').config();

const startServer = require('./server');

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || '0.0.0.0';
startServer(port, hostname);
