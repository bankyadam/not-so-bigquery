import fs from 'fs';

import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';

chai.use(sinonChai);
chai.use(chaiString);

const readTextFile = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.txt'] = readTextFile;
require.extensions['.md'] = readTextFile;
