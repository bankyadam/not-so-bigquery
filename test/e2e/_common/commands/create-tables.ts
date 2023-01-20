import runEverywhere from './run-everywhere';

export default function(datasetId, tableName, schema) {
  return runEverywhere(async (conn, args) => {
    const table = conn.dataset(args[0]).table(args[1]);
    try {
      await table.delete();
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    await conn.dataset(args[0]).createTable(args[1], { schema: args[2] });

    return conn.dataset(args[0]).table(args[1]);
  }, datasetId, tableName, schema);
}
