import type { DataXY, DoubleArray } from 'cheminfo-types';
import type {
  DoubleMatrix,
  XGetFromToIndexOptions,
} from 'ml-spectra-processing';
import { xGetFromToIndex, xMaxValue, xMinValue } from 'ml-spectra-processing';

/**
 * Scale matrix rows to match min-max range of target
 * @param matrix - Matrix to scale (modified in place)
 * @param normalizedTarget - Target data with x and y arrays
 * @param range - Optional range to consider
 */
export function minMax(
  matrix: DoubleMatrix,
  normalizedTarget: DataXY,
  range: XGetFromToIndexOptions = {},
): void {
  const fromToIndex = xGetFromToIndex(normalizedTarget.x as DoubleArray, range);
  const targetValue = {
    min: xMinValue(normalizedTarget.y as DoubleArray, fromToIndex),
    max: xMaxValue(normalizedTarget.y as DoubleArray, fromToIndex),
  };

  const deltaTarget = targetValue.max - targetValue.min;
  const minTarget = targetValue.min;

  const values = matrix.map((row) => {
    return {
      min: xMinValue(row, fromToIndex),
      max: xMaxValue(row, fromToIndex),
    };
  });
  for (let i = 0; i < matrix.length; i++) {
    const deltaSource = values[i].max - values[i].min;
    const minSource = values[i].min;
    const newData: number[] = [];
    for (let j = 0; j < normalizedTarget.y.length; j++) {
      newData.push(
        ((matrix[i][j] - minSource) / deltaSource) * deltaTarget + minTarget,
      );
    }
    matrix[i] = newData;
  }
}
