import { BaseToken } from '../baseToken';

export class IdentifierQualifier extends BaseToken {
  pattern = /\./
}

export default IdentifierQualifier.compile();
