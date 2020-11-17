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
export function getShifts(targetPoint, from, to, data, options) {
  if (!from || !to) return;
  data = data.map((item) => item.normalized);
  const targetIndex = xFindClosestIndex(data[0].x, targetPoint);
  let shifts = [];
  for (let i = 0; i < data.length; i++) {
    const xAxis = data[i].x;
    const fromIndex = xAxis.indexOf(from);
    const toIndex = xAxis.indexOf(to);
    const slicedSpectrum = { x: [], y: [] };
    for (let j = fromIndex; j < toIndex; j++) {
      slicedSpectrum.x.push(data[i].x[j]);
      slicedSpectrum.y.push(data[i].y[j]);
    }
    const peaks = gsd(slicedSpectrum.x, slicedSpectrum.y, options);
    const middle = mean(peaks.map((value) => value.index));
    shifts.push(Math.round(middle + fromIndex) - targetIndex);
  }
  return shifts;
}
