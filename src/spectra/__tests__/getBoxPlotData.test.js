import { getBoxPlotData } from '../getBoxPlotData';

let spectra = [
  {
    normalized: {
      x: [10, 20, 30],
      y: [1, 2, 3]
    }
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [2, 3, 4]
    }
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [3, 4, 5]
    }
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [4, 5, 6]
    }
  },
  {
    normalized: {
      x: [10, 20, 30],
      y: [6, 7, 8]
    }
  }
];

describe('getBoxPlotData', () => {
  it('Load set of data', () => {
    let result = getBoxPlotData(spectra);
    expect(result).toEqual({
      x: [10, 20, 30],
      Q1: [1.5, 2.5, 3.5],
      Q2: [3, 4, 5],
      Q3: [5, 6, 7],
      min: [1, 2, 3],
      max: [6, 7, 8]
    });
  });
});
