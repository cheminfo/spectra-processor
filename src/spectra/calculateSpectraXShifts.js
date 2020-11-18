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

export function calculateSpectraXShifts(spectra, targetPoint, options = {}) {
  const {
    from = 0,
    to = 10,
    gsdOptions = {
      minMaxRatio: 0.4,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 10,
        polynomial: 3,
      },
    },
  } = options;

  if (!from || !to) return;
  const normalizedSpectra = spectra.map((item) => item.normalized);
  let shifts;

  if (spectra[0].y.length !== 0) {
    shifts = getShifts(spectra, targetPoint, {
      from: from,
      to: to,
      gsdOptions: gsdOptions,
    });
  }

  let normalizedShifts = getShifts(normalizedSpectra, targetPoint, {
    from: from,
    to: to,
    gsdOptions: gsdOptions,
  });

  for (let i = 0; i < spectra.length; i++) {
    spectra[i].shift = shifts ? shifts[i] : false;
    spectra[i].normalized.shift = normalizedShifts[i];
  }
}

function getShifts(spectra, targetPoint, { from, to, gsdOptions }) {
  let shifts = [];
  for (let i = 0; i < spectra.length; i++) {
    const targetIndex = xFindClosestIndex(spectra[i].x, targetPoint);
    const xAxis = spectra[i].x.slice();
    const fromIndex = xFindClosestIndex(xAxis, from);
    const toIndex = xFindClosestIndex(xAxis, to);
    const slicedSpectrum = { x: [], y: [] };
    for (let j = fromIndex; j < toIndex; j++) {
      slicedSpectrum.x.push(spectra[i].x[j]);
      slicedSpectrum.y.push(spectra[i].y[j]);
    }
    const peaks = gsd(slicedSpectrum, gsdOptions);
    const middle = mean(peaks.map((value) => value.index));
    shifts.push(targetIndex - Math.round(middle + fromIndex));
  }
  return shifts;
}
