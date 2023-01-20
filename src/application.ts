import express, { Express } from 'express';

import headersMiddleware from './middlewares/headers';
import logRequestsMiddleware from './middlewares/log-requests';

import api from './api/v2';

const app: Express = express();

app.use(express.json({ limit: '50mb' }));

app.use(headersMiddleware);
app.use(logRequestsMiddleware);
app.get('/', (_req, res) => {
  res.send('<h1>Not So BigQuery</h1>');
});
app.use('/bigquery/v2', api);

app.all('*', (req, res) => {
  console.error('unhandled route', req.method, req.originalUrl);
  res.status(404);
});

export default app;
