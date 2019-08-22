import { getNormalizedData } from './getNormalizedData.js';

/**
 * @private
 * @param {*} spectra
 * @param {*} options
 */

export function getNormalizedTSV(spectra) {
  let { matrix, meta, ids, x } = getNormalizedData(spectra);

  let allKeysObject = {};
  for (let metum of meta) {
    for (let key of Object.keys(metum)) {
      allKeysObject[key] = true;
    }
  }
  let allKeys = Object.keys(allKeysObject);

  let lines = [];
  let line = [];
  line.push('id', ...allKeys, ...x);
  lines.push(line.join('\t'));

  for (let i = 0; i < ids.length; i++) {
    line = [];
    line.push(ids[i]);
    for (let key of allKeys) {
      line.push(meta[i][key]);
    }
    line.push(...matrix[i]);
    lines.push(line.join('\t'));
  }

  return lines.join('\n');
}
