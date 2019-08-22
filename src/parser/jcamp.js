import { convert } from 'jcampconverter';

import { getJcampKind } from '../Kinds';
/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {string} jcamp - String containing the JCAMP data
 * @return {Spectrum} - New class element with the given data
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
