import equallySpaced from 'ml-array-xy-equally-spaced';
import Stat from 'ml-stat/array';

export function getNormalized(spectrum, options = {}) {
  if (!Array.isArray(spectrum.x) || !Array.isArray(spectrum.y)) {
    throw new Error('Can not get normalized data');
  }

  let {
    from = spectrum.x[0],
    to = spectrum.x[spectrum.x.length - 1],
    numberOfPoints = 1024,
    filters = [],
    exclusions = []
  } = options;

  let y = spectrum.y.slice(0);

  for (let filter of filters) {
    switch (filter.name) {
      case 'centerMean': {
        let mean = Stat.mean(spectrum.y);
        let meanFct = (y) => y - mean;
        y = y.map(meanFct);
        break;
      }
      case 'scaleSD': {
        let std = Stat.standardDeviation(spectrum.y);
        let stdFct = (y) => y / std;
        y = y.map(stdFct);
        break;
      }
      default:
        throw new Error(`Unknown process kind: ${process.kind}`);
    }
  }

  let result = equallySpaced(
    { x: spectrum.x, y },
    { from, to, numberOfPoints, exclusions }
  );

  return result;
}
