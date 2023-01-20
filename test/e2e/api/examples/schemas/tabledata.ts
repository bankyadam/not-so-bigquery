import fields from '../fields';

export const schema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_INTEGER
  ]
};

export const generator = i => ({
  [fields.FIELD_SIMPLE_STRING.name]: `long test to check ${i}`,
  [fields.FIELD_SIMPLE_INTEGER.name]: Math.round(Math.random() * 900000000 + 100000000)
});
