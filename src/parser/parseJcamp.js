import { convert } from 'jcampconverter';

import { getJcampKind } from '../Kinds';
/**
 * Create a spectrum from a jcamp
 * @param {string|ArrayBuffer|Uint8Array} jcampText - String containing the JCAMP data
 * @return {Spectrum[]} - new instance of Spectrum with the provided data
 */
export default function jcamp(jcampText) {
  const entries = convert(jcampText, { keepRecordsRegExp: /TITLE/ }).flatten;
  const results = [];
  for (const entry of entries) {
    const kind = getJcampKind(entry);
    const data = entry.spectra[0].data;
    const meta = entry.info;
    // we convert the data
    if (kind && kind.importation && kind.importation.converter) {
      data.y = data.y.map(kind.importation.converter);
    }

    results.push({ data, kind, meta });
  }
  return results;
}
