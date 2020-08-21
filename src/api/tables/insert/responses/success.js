module.exports = (projectId, datasetId, tableId) => ({
  kind: 'bigquery#table',
  etag: '',
  id: `${projectId}:${datasetId}.${tableId}`,
  selfLink: `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
  tableReference: { datasetId, projectId, tableId },
  defaultTableExpirationMs: '5184000000',
  access: [],
  creationTime: '1597143719946',
  lastModifiedTime: '1597143719946',
  location: 'US',
  defaultPartitionExpirationMs: '5184000000'
});
