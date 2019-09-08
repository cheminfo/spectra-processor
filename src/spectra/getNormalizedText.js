import { getNormalizedData } from './getNormalizedData.js';

/**
 * @private
 * @param {*} spectra
 * @param {object} [options={}]
 * @param {string} [options.fs='\t'] field separator
 * @param {string} [options.rs='\n'] record (line) separator
 */

export function getNormalizedText(spectra, options = {}) {
  let { fs = '\t', rs = '\n' } = options;
  let { matrix, meta, ids, x } = getNormalizedData(spectra);
  let allKeysObject = {};
  for (let metum of meta) {
    for (let key of Object.keys(metum)) {
      let type = typeof metum[key];
      if (type === 'number' || type === 'string' || type === 'boolean') {
        allKeysObject[key] = true;
      }
    }
  }
  let allKeys = Object.keys(allKeysObject);

  let lines = [];
  let line = [];
  line.push('id', ...allKeys, ...x);
  lines.push(line.join(fs));

  for (let i = 0; i < ids.length; i++) {
    line = [];
    line.push(ids[i]);
    for (let key of allKeys) {
      line.push(meta[i][key]);
    }
    line.push(...matrix[i]);
    lines.push(line.join(fs));
  }

  return lines.join(rs);
}
