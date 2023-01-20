import fields from '../fields';

export const schema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_INTEGER,
    fields.FIELD_SIMPLE_BOOLEAN
  ]
};

export const generator = i => ({
  [fields.FIELD_SIMPLE_STRING.name]: `long test to check ${i}`,
  [fields.FIELD_SIMPLE_INTEGER.name]: Math.round(Math.random() * 900000000 + 100000000),
  [fields.FIELD_SIMPLE_BOOLEAN.name]: Math.random() > 0.5
});
