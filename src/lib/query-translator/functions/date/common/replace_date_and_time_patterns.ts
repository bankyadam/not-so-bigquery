import { reduce } from 'lodash';

const FORMAT_ELEMENT_MAP = {
  A: 'FMDay',
  a: 'Dy',
  B: 'FMMonth',
  b: 'Mon',
  c: 'Dy Mon DD HH24:MI:SS YYYY',
  C: 'CC',
  D: 'MM/DD/YY',
  d: 'DD',
  Ez: 'TZH:TZM',
  E1S: 'SS.FF1',
  E2S: 'SS.FF2',
  E3S: 'SS.FF3',
  E4S: 'SS.FF4',
  E5S: 'SS.FF5',
  E6S: 'SS.FF6',
  'E\\*S': 'SS.FF6',
  E4Y: 'YYYY',
  e: 'FMDD',
  F: 'YYYY-MM-DD',
  G: 'IYYY',
  g: 'IY',
  H: 'HH24',
  h: 'Mon',
  I: 'HH12',
  J: 'IDDD',
  j: 'DDD',
  k: 'HH24',
  l: 'HH',
  M: 'MI',
  m: 'MM',
  n: '\\n',
  P: 'am',
  p: 'am',
  Q: 'Q',
  R: 'HH24:MI',
  S: 'SS',
  s: null,
  T: 'HH24:MI:SS',
  t: '\\t',
  U: 'WW',
  u: 'ID',
  V: 'IW',
  W: 'IW',
  w: 'D', // Not supported correctly
  X: 'HH24:MI:SS',
  x: 'MM/DD/YY',
  Y: 'YYYY',
  y: 'YY',
  Z: 'TZ',
  z: 'OF',
  '%': '%'
};

export default function(template) {
  return reduce(FORMAT_ELEMENT_MAP,
    function(template, postgresFormatElement, bqFormatElement) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      return template.replaceAll('%' + bqFormatElement, postgresFormatElement);
    },
    template
  );
}
