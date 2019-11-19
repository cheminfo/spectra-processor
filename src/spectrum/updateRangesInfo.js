import { XY, X } from 'ml-spectra-processing';

/**
 * @private
 * @param {*} spectrum
 * @param {*} ranges
 */
export function updateRangesInfo(spectrum, ranges = []) {
  spectrum.ranges = {};
  for (let range of ranges) {
    range = JSON.parse(JSON.stringify(range));
    spectrum.ranges[range.label] = range;
    let fromToIndex = {
      fromIndex: X.findClosestIndex(spectrum.normalized.x, range.from),
      toIndex: X.findClosestIndex(spectrum.normalized.x, range.to),
    };
    range.integration = XY.integration(spectrum.normalized, fromToIndex);
    range.maxPoint = XY.maxYPoint(spectrum.normalized, fromToIndex);
    range.minPoint = XY.minYPoint(spectrum.normalized, fromToIndex);
    range.x = spectrum.normalized.x.slice(
      fromToIndex.fromIndex,
      fromToIndex.toIndex + 1,
    );
    range.y = spectrum.normalized.y.slice(
      fromToIndex.fromIndex,
      fromToIndex.toIndex + 1,
    );
  }
}
