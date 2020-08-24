'use strict';

module.exports = (req, _res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}
    ❔ ${JSON.stringify(req.query)}
    📝 ${JSON.stringify(req.body)}`);
  next();
};
