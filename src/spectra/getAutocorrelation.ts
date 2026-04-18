import type { DoubleArray, DoubleMatrix } from 'cheminfo-types';
import { matrixAutoCorrelation } from 'ml-spectra-processing';

export interface NormalizedData {
  x: DoubleArray;
  matrix: DoubleMatrix;
}

export interface AutocorrelationResult {
  x: DoubleArray;
  y: Float64Array;
}

/**
 * Compute the autocorrelation of the matrix column at `index`.
 * @param normalized - Normalized data with shared x axis and a value matrix
 * @param index - Column index used as the reference for the autocorrelation
 * @returns The shared x axis and the autocorrelation y values
 */
export function getAutocorrelation(
  normalized: NormalizedData,
  index: number,
): AutocorrelationResult {
  return {
    x: normalized.x,
    y: matrixAutoCorrelation(normalized.matrix, index),
  };
}
