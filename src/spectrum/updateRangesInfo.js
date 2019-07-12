import {
  arrayFindClosestIndex,
  xyIntegration,
  xyMaxYPoint
} from 'ml-spectra-processing';

export function updateRangesInfo(spectrum, ranges = []) {
  spectrum.ranges = {};
  for (let range of ranges) {
    range = JSON.parse(JSON.stringify(range));
    spectrum.ranges[range.label] = range;
    let fromToIndex = {
      fromIndex: arrayFindClosestIndex(spectrum.normalized.x, range.from),
      toIndex: arrayFindClosestIndex(spectrum.normalized.x, range.to)
    };
    range.integration = xyIntegration(spectrum.normalized, fromToIndex);
    range.maxPoint = xyMaxYPoint(spectrum.normalized, fromToIndex);
  }
}
