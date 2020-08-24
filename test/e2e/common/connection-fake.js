'use strict';

const { BigQuery } = require('@google-cloud/bigquery');

module.exports = new BigQuery({ apiEndpoint: process.env.BIGQUERY_API_ENDPOINT, location: 'EU' });
