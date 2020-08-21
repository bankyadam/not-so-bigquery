const BaseResponse = require('../baseResponse');

module.exports = class TableDataInsertAllResponseObject extends BaseResponse {
  get TYPE() {
    return 'tableDataInsertAllResponse';
  };
};
