import { xMinValue, xMaxValue } from 'ml-spectra-processing';

import { getFromToIndex } from './getFromToIndex';

export function minMax(matrix, normalizedTarget, range = {}) {
  let fromToIndex = getFromToIndex(normalizedTarget.x, range);
  let targetValue = {
    min: xMinValue(normalizedTarget.y, fromToIndex),
    max: xMaxValue(normalizedTarget.y, fromToIndex),
  };

  let deltaTarget = targetValue.max - targetValue.min;
  let minTarget = targetValue.min;

  let values = matrix.map((row) => {
    return {
      min: xMinValue(row, fromToIndex),
      max: xMaxValue(row, fromToIndex),
    };
  });
  for (let i = 0; i < matrix.length; i++) {
    let deltaSource = values[i].max - values[i].min;
    let minSource = values[i].min;
    let newData = [];
    for (let j = 0; j < normalizedTarget.y.length; j++) {
      newData.push(
        ((matrix[i][j] - minSource) / deltaSource) * deltaTarget + minTarget,
      );
    }
    matrix[i] = newData;
  }
}
