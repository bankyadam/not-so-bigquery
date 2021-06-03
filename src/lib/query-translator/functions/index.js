'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  CURRENT_DATE: function(ctx) { return 'TO_CHAR(CURRENT_TIMESTAMP, \'YYYY-MM-DD\')'; },
  DATE: require('./date'),
  DATE_ADD: require('./date_add')
};
