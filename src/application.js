'use strict';

require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || '0.0.0.0';

app.use(express.json());
app.use(require('./middlewares/headers'));
app.use(require('./middlewares/log-requests'));
app.get('/', (_req, res) => {
  res.send('<h1>Not So BigQuery');
});
app.use('/bigquery/v2', require('./api/v2'));

app.all('*', (req, res) => {
  console.error('unhandled route', req.method, req.originalUrl);
  res.status(404);
});

const fs = require('fs');
const key = fs.readFileSync(__dirname + '/../docker/app/cert/key.pem');
const cert = fs.readFileSync(__dirname + '/../docker/app/cert/cert.pem');
const https = require('https');
const server = https.createServer({ key, cert }, app);
server.listen(port, hostname, () => {
  console.log(`App listening at https://localhost:${port}`);
});
