module.exports = (projectId, datasetId, tableId) => ({
  error: {
    code: 409,
    message: `Already Exists: Table ${projectId}:${datasetId}.${tableId}`,
    errors: [], // ERRORS TO POPULATE
    status: 'ALREADY_EXISTS'
  }
});
