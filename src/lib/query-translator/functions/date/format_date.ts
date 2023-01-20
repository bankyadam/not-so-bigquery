import { reduce } from 'lodash';

export default function(ctx) {
  const template = this.visit(ctx.expression[0]);
  const dateExpression = this.visit(ctx.expression[1]);
  return [
    'REGEXP_REPLACE(',
    'TO_CHAR(',
    dateExpression,
    ',',
    replaceTemplatePatterns(template),
    ')',
    ',',
    '\']]]](\\d{2})\\d{2}\\[\\[\\[\\[\'',
    ',',
    '\'\\1\'',
    ')'
  ].join('');
}

const FORMAT_ELEMENT_MAP = {
  A: 'FMDay',
  a: 'Dy',
  B: 'FMMonth',
  b: 'Mon',
  C: ']]]]YYYY[[[[',
  D: 'MM/DD/YY',
  d: 'DD',
  e: 'FMDD',
  F: 'YYYY-MM-DD',
  G: 'IYYY',
  g: 'IY',
  h: 'Mon',
  j: 'DDD',
  m: 'MM',
  n: '\n',
  Q: 'Q',
  t: '\t',
  U: 'WW',
  u: 'ID',
  V: 'IW',
  W: 'IW',
  w: 'D', // Not supported correctly
  x: 'MM/DD/YY',
  Y: 'YYYY',
  y: 'YY',
  E4Y: 'YYYY'
};

const replaceTemplatePatterns = function(template) {
  return reduce(Object.keys(FORMAT_ELEMENT_MAP), function(template, bqFormatElement) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return template.replace(new RegExp('%' + bqFormatElement, 'g'), FORMAT_ELEMENT_MAP[bqFormatElement]);
  }, template);
};
