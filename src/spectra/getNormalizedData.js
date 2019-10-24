/**
 * @private
 * @param {*} spectra
 * @param {*} options
 */

export function getNormalizedData(spectra, options = {}) {
  const { ids } = options;

  let matrix = [];
  let meta = [];
  let currentIDs = [];
  let x = [];

  if (Array.isArray(spectra) && spectra.length > 0) {
    for (let spectrum of spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        currentIDs.push(spectrum.id);
        matrix.push(spectrum.normalized.y);
        meta.push(spectrum.meta);
      }
    }
    x = spectra[0].normalized.x;
  }

  return { ids: currentIDs, matrix, meta, x };
}
