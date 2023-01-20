import { BaseToken } from '../../../../src/lib/query-translator/tokens/baseToken';
import { expect } from 'chai';

export default function testTokenImages(subject: BaseToken, images: string[]) {
  images.forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = subject.pattern.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
}
