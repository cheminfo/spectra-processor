import { getBoxPlotAnnotations } from '../getBoxPlotAnnotations';

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

describe('getBoxPlotAnnotations', () => {
  it('Load set of data', () => {
    let result = getBoxPlotAnnotations(spectra);
    console.log(JSON.stringify(result, undefined, 2));
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
