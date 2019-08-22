import { convert } from 'jcampconverter';

import { getJcampKind } from '../Kinds';
/**
 * Create a spectrum from a jcamp
 * @param {string} jcamp - String containing the JCAMP data
 * @return {Spectrum} - new instance of Spectrum with the provided data
 */
export default function jcamp(jcamp) {
  const parsed = convert(jcamp, { xy: true, keepRecordsRegExp: /TITLE/ });
  const kind = getJcampKind(parsed);
  const data = parsed.spectra[0].data[0];
  const meta = parsed.info;
  // we convert the data
  if (kind && kind.importation && kind.importation.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return { data, kind, meta };
}
