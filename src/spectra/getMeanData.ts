import type { DoubleArray } from 'cheminfo-types';
import { Matrix } from 'ml-matrix';
import type { DoubleMatrix } from 'ml-spectra-processing';

export interface NormalizedData {
  x: DoubleArray;
  matrix: DoubleMatrix;
}

export interface MeanData {
  x: DoubleArray;
  y: number[];
}

/**
 * Calculate mean of normalized data
 * @param normalized - Normalized data with x and matrix
 * @returns Mean data with x and y values
 */
export function getMeanData(normalized: NormalizedData): MeanData {
  const matrix = new Matrix(normalized.matrix);
  return {
    x: normalized.x,
    y: matrix.mean('column'),
  };
}
