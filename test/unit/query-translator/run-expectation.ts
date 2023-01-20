import { expect } from 'chai';

import subject from '../../../src/lib/query-translator';

const _getTestCaseData = function(content) {
  return /^--INPUT--\n([\s\S]+?);?\n--EXPECT--\n([\s\S]*?);?\s*$/.exec(content);
};

export default function(content) {
  return () => {
    const result = _getTestCaseData(content);
    expect(subject(result[1], 'defaultProject').toLowerCase())
      .to.be.equalIgnoreSpaces(result[2].toLowerCase());
  };
}

