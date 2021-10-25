'use strict';

module.exports = () => {
  const testId = Math.round(Math.random() * 10000000);
  return {
    DATASET_NAME: `testing_${testId}`,
    TABLE_NAME: `test_table_${testId}`
  };
};
