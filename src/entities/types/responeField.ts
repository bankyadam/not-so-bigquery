import { FieldType } from '../../lib/db/types/fieldType';
import { POSTGRES_TYPES } from '../../lib/bigQuery/types';

export type ResponseField = { name: string, mode: FieldType, type: POSTGRES_TYPES };
