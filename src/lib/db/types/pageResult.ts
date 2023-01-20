import { Field } from './field';

export interface PageResult {
  data: unknown[],
  totalRows: number,
  nextPageToken: string,
  fields: Field[]
}
