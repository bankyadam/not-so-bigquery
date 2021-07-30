'use strict';

const express = require('express');

const app = express();
app.use(express.json());
app.use(require('./middlewares/headers'));
app.use(require('./middlewares/log-requests'));
app.get('/', (_req, res) => {
  res.send('<h1>Not So BigQuery</h1>');
});
app.use('/bigquery/v2', require('./api/v2'));

app.all('*', (req, res) => {
  console.error('unhandled route', req.method, req.originalUrl);
  res.status(404);
});

module.exports = app;
