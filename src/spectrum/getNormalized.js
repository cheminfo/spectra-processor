import equallySpaced from 'ml-array-xy-equally-spaced';
import Stat from 'ml-stat/array';

export function getNormalized(spectrum, options = {}) {
  let {
    from = 0,
    to = 100,
    numberOfPoints = 1024,
    processes = [],
    exclusions = []
  } = options;

  let y = spectrum.y.slice(0);
  for (let process of processes) {
    switch (process.kind) {
      case 'centerMean':
        var mean = Stat.mean(spectrum.y);
        y = y.map((y) => y - mean);
        break;
      case 'scaleSD':
        var std = Stat.standardDeviation(spectrum.y);
        y = y.map((y) => y / std);
        break;
      default:
        console.error(`Unknown process kind: ${process.kind}`);
    }
  }

  let result = equallySpaced(
    { x: spectrum.x, y },
    { from, to, numberOfPoints, exclusions }
  );
  spectrum.normalized = result;

  return result;
}
