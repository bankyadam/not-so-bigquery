import runEverywhere from './run-everywhere';

export default function(datasetId) {
  return runEverywhere(async conn => conn.dataset(datasetId).create());
}
