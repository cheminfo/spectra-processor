import { convert } from 'jcampconverter';

import { getJcampKind } from '../../Kinds';
import { Spectrum } from '../Spectrum';
/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {string} jcamp - String containing the JCAMP data
 * @return {Spectrum} - New class element with the given data
 */
export function fromJcamp(jcamp, id, meta) {
  const data = convert(jcamp, { xy: true });
  const kind = getJcampKind(data);

  console.log(kind);
}
