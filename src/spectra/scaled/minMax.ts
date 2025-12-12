import type { DataXY, DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix } from 'ml-spectra-processing';
import { xMaxValue, xMinValue } from 'ml-spectra-processing';

import type { Range } from './getFromToIndex.js';
import { getFromToIndex } from './getFromToIndex.js';

/**
 * Scale matrix rows to match min-max range of target
 * @param matrix - Matrix to scale (modified in place)
 * @param normalizedTarget - Target data with x and y arrays
 * @param range - Optional range to consider
 */
export function minMax(
  matrix: DoubleMatrix,
  normalizedTarget: DataXY,
  range: Range = {},
): void {
  const fromToIndex = getFromToIndex(normalizedTarget.x as DoubleArray, range);
  const targetValue = {
    min: xMinValue(normalizedTarget.y as DoubleArray, fromToIndex),
    max: xMaxValue(normalizedTarget.y as DoubleArray, fromToIndex),
  };

  const deltaTarget = targetValue.max - targetValue.min;
  const minTarget = targetValue.min;

  const values = matrix.map((row) => {
    return {
      min: xMinValue(row as DoubleArray, fromToIndex),
      max: xMaxValue(row as DoubleArray, fromToIndex),
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
