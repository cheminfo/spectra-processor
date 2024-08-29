import { convert } from 'jcampconverter';

import { getJcampKind } from '../Kinds';

/**
 * Create a spectrum from a jcamp
 * @param {string} jcampText - String containing the JCAMP data
 * @returns {Spectrum} - new instance of Spectrum with the provided data
 */
export default function parseJcamp(jcampText) {
  const parsed = convert(jcampText, { keepRecordsRegExp: /TITLE/ }).flatten[0];
  const kind = getJcampKind(parsed);
  const data = parsed.spectra[0].data;
  const meta = parsed.info;
  // we convert the data
  if (kind && kind.importation && kind.importation.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return { data, kind, meta };
}
