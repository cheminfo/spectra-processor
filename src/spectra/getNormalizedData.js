/**
 * @private
 * @param {*} spectra
 * @param {*} options
 */

export function getNormalizedData(spectra, options = {}) {
  const { ids } = options;
  if (!spectra || !spectra[0]) return {};
  let matrix = [];
  let meta = [];
  let currentIDs = [];

  for (let spectrum of spectra) {
    if (!ids || ids.includes(spectrum.id)) {
      currentIDs.push(spectrum.id);
      matrix.push(spectrum.normalized.y);
      meta.push(spectrum.meta);
    }
  }
  let x = spectra[0].normalized.x;
  return { ids: currentIDs, matrix, meta, x };
}
