import type { DoubleArray, DoubleMatrix } from 'cheminfo-types';
import type { MatrixBoxPlot } from 'ml-spectra-processing';
import { matrixBoxPlot } from 'ml-spectra-processing';

export interface NormalizedData {
  ids?: unknown[];
  matrix: DoubleMatrix;
  meta?: unknown[];
  x: DoubleArray;
}

export interface BoxPlotData extends MatrixBoxPlot {
  x: DoubleArray;
}

/**
 * Compute box-plot statistics (q1, median, q3, min, max) per column of the matrix.
 * @param normalizedData - Normalized data with shared x axis and a value matrix
 * @returns The shared x axis and the per-column box-plot statistics
 */
export function getBoxPlotData(normalizedData: NormalizedData): BoxPlotData {
  return {
    x: normalizedData.x,
    ...matrixBoxPlot(normalizedData.matrix),
  };
}
