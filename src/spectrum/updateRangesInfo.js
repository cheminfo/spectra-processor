import { XY, Array } from 'ml-spectra-processing';

export function updateRangesInfo(spectrum, ranges = []) {
  spectrum.ranges = {};
  for (let range of ranges) {
    range = JSON.parse(JSON.stringify(range));
    spectrum.ranges[range.label] = range;
    let fromToIndex = {
      fromIndex: Array.findClosestIndex(spectrum.normalized.x, range.from),
      toIndex: Array.findClosestIndex(spectrum.normalized.x, range.to)
    };
    range.integration = XY.integration(spectrum.normalized, fromToIndex);
    range.maxPoint = XY.maxYPoint(spectrum.normalized, fromToIndex);
  }
}
