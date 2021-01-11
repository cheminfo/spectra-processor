import { getNormalizedData } from './getNormalizedData.js';
import { convertToText } from './util/convertToText.js';
/**
 * @private
 * @param {*} spectra
 * @param {object} [options={}]
 * @param {string} [options.fs='\t'] field separator
 * @param {string} [options.rs='\n'] record (line) separator
 */

export function getNormalizedText(spectra, options = {}) {
  let { fs = '\t', rs = '\n' } = options;

  return convertToText(getNormalizedData(spectra), {
    rs,
    fs,
  });
}
