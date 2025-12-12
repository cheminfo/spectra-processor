import type { DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix } from 'ml-spectra-processing';
import { matrixAutoCorrelation } from 'ml-spectra-processing';

export interface NormalizedData {
  x: DoubleArray;
  matrix: DoubleMatrix;
}

export interface AutocorrelationResult {
  x: DoubleArray;
  y: Float64Array;
}

export function getAutocorrelation(
  normalized: NormalizedData,
  index: number,
): AutocorrelationResult {
  return {
    x: normalized.x,
    y: matrixAutoCorrelation(normalized.matrix, index),
  };
}
