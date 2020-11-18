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

export function calculateSpectraXShifts(spectra, range = {}, options = {}) {
  const {
    targetX = 0,
    nbPeaks = 1,
    gsd: gsdOptions = {
      minMaxRatio: 0.1,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 7,
        polynomial: 3,
      },
    },
  } = options;
  let { from, to } = range;
  if (!from || !to) return;

  for (let spectrum of spectra) {
    const fromIndex = xFindClosestIndex(spectrum.x, from);
    const toIndex = xFindClosestIndex(spectrum.x, to);
    const slicedSpectrum = {
      x: spectrum.x.slice(fromIndex, toIndex),
      y: spectrum.y.slice(fromIndex, toIndex),
    };

    let peaks = gsd(slicedSpectrum, gsdOptions)
      .sort((a, b) => b.y - a.y)
      .slice(0, nbPeaks);

    const middle = mean(peaks.map((peak) => peak.x));

    spectrum.xShift = targetX - middle;
  }
}
