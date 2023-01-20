import { POSTGRES_TYPES } from '../../bigQuery/types';
import { FieldType } from './fieldType';

export interface Field {
  name: string,
  mode: FieldType,
  type: POSTGRES_TYPES,
  description?: string
}
