const { BigQuery } = require('@google-cloud/bigquery');

module.exports = new BigQuery({ location: 'EU' });
