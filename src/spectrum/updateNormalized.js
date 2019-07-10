import equallySpaced from 'ml-array-xy-equally-spaced';
import Stat from 'ml-stat/array';

export function updateNormalized(spectrum, options = {}) {
  let {
    from = spectrum.x[0],
    to = spectrum.x[spectrum.x.length - 1],
    numberOfPoints = 1024,
    processes = [],
    exclusions = []
  } = options;

  let y = spectrum.y.slice(0);
  for (let process of processes) {
    switch (process.kind) {
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
  spectrum.normalized = result;

  return result;
}
