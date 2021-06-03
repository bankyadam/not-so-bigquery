'use strict';

module.exports = {
  CURRENT_DATE: function(ctx) { return 'TO_CHAR(CURRENT_TIMESTAMP, \'YYYY-MM-DD\')'; },
  DATE: require('./date')
};
