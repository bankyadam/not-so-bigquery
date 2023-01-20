import runEverywhere from './run-everywhere';

export default async function(datasetId) {
  return runEverywhere(async (conn, args) => {
    try {
      return await conn.dataset(args[0]).delete({ force: true });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
  }, datasetId);
}
