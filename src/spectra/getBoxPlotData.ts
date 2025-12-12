import type { DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix, MatrixBoxPlot } from 'ml-spectra-processing';
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

export function getBoxPlotData(normalizedData: NormalizedData): BoxPlotData {
  return {
    x: normalizedData.x,
    ...matrixBoxPlot(normalizedData.matrix),
  };
}
