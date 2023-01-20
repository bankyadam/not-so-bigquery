import runEverywhere from './run-everywhere';

export default function(datasetId, tableName, generator, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(generator(i));
  }
  return runEverywhere(
    async (conn, args) => conn.dataset(args[0]).table(args[1]).insert(args[2]),
    datasetId, tableName, rows
  );
}
