import mean from 'ml-array-mean';
import { gsd } from 'ml-gsd';
import { xFindClosestIndex } from 'ml-spectra-processing';

/**
 * Calculates the shift between the signal of interest and a target signal
 * @param {number} [targetPoint] - Target point to set the interest signal.
 * @param {number} [from] - Beginning of the range where the interest signal is localed
 * @param {number} [to] - End of the range where the interest signal is localed
 * @param {Object} [options={}]
 * @param {number} [options.minMaxRatio=0.4] - GSD Threshold to determine if a given peak should be considered as a noise.
 * @return {Array<number>} Array with the shifts between the spectra and the target point
 */

export function getSpectraShifts(spectra, targetPoint, from, to, gsdOptions) {
  if (!from || !to) return;
  let shifts = [];
  for (let i = 0; i < spectra.length; i++) {
    const targetIndex = xFindClosestIndex(spectra[i].x, targetPoint);
    const xAxis = spectra[i].x;
    const fromIndex = xAxis.indexOf(from);
    const toIndex = xAxis.indexOf(to);
    const slicedSpectrum = { x: [], y: [] };
    for (let j = fromIndex; j < toIndex; j++) {
      slicedSpectrum.x.push(spectra[i].x[j]);
      slicedSpectrum.y.push(spectra[i].y[j]);
    }
    const peaks = gsd(slicedSpectrum.x, slicedSpectrum.y, gsdOptions);
    const middle = mean(peaks.map((value) => value.index));
    shifts.push(targetIndex - Math.round(middle + fromIndex));
  }
  return shifts;
}
