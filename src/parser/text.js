import { parseXY } from 'xy-parser';

/**
 * Create a spectrum from a text file
 * @param {string} text - String containing the JCAMP data
 * @return {Spectrum} - new instance of Spectrum with the provided data
 */
export default function text(text, options = {}) {
  const { kind, parserOptions = {} } = options;

  const data = parseXY(text, parserOptions);

  // we convert the data
  if (kind && kind.importation && kind.importation.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return { data };
}
