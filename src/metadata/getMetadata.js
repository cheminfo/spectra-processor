/**
 * @private
 * @param {*} spectra
 * @param {object} options
 */

export function getMetadata(spectra, options = {}) {
  const { ids } = options;

  let metadata = [];

  if (Array.isArray(spectra) && spectra.length > 0) {
    for (let spectrum of spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        metadata.push(spectrum.meta);
      }
    }
  }

  return metadata;
}
