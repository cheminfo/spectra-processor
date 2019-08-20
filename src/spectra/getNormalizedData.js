export function getNormalizedData(spectra) {
  if (!spectra || !spectra[0]) return {};
  let matrix = [];
  let meta = [];
  let currentIDs = [];

  for (let spectrum of spectra) {
    currentIDs.push(spectrum.id);
    matrix.push(spectrum.normalized.y);
    meta.push(spectrum.meta);
  }
  let x = spectra[0].normalized.x;
  return { ids: currentIDs, matrix, meta, x };
}
