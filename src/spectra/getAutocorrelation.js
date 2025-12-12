import { matrixAutoCorrelation } from 'ml-spectra-processing';

/**
 * @param normalized
 * @param index
 * @private
 */

export function getAutocorrelation(normalized, index) {
  return {
    x: normalized.x,
    y: matrixAutoCorrelation(normalized.matrix, index),
  };
}
