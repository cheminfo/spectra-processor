import { convert } from 'jcampconverter';

import { getJcampKind } from '../Kinds';
/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {string} jcamp - String containing the JCAMP data
 * @return {Spectrum} - New class element with the given data
 */
export function fromJcamp(jcamp) {
  const data = convert(jcamp, { xy: true });
  const kind = getJcampKind(data);
  // we convert the data
  if (kind && kind.importation && kind.importation.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return { data, kind };
}
