const fs = require('fs');
const path = require('path');

const tokens = {};
const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file === path.basename(__filename)) {
    return;
  }
  const token = require(__dirname + '/' + file);
  tokens[token.name] = token;
});

module.exports = tokens;
