import fs from 'fs';

import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';

chai.use(sinonChai);
chai.use(chaiString);

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
