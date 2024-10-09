import {
  xyIntegration,
  xyMaxYPoint,
  xyMinYPoint,
  xFindClosestIndex,
} from 'ml-spectra-processing';

/**
 * @private
 * @param {*} spectrum
 * @param {*} ranges
 */
export function updateRangesInfo(spectrum, ranges = []) {
  spectrum.ranges = {};
  for (let range of ranges) {
    range = structuredClone(range);
    spectrum.ranges[range.label] = range;
    let fromToIndex = {
      fromIndex: xFindClosestIndex(spectrum.normalized.x, range.from),
      toIndex: xFindClosestIndex(spectrum.normalized.x, range.to),
    };
    range.deltaX = spectrum.normalized.x[fromToIndex.toIndex] - spectrum.normalized.x[fromToIndex.fromIndex];
    range.baseline = (spectrum.normalized.y[fromToIndex.toIndex] + spectrum.normalized.y[fromToIndex.fromIndex]) * range.deltaX / 2;
    range.integration = xyIntegration(spectrum.normalized, fromToIndex);
    range.correctedIntegration = range.integration - range.baseline;
    range.maxPoint = xyMaxYPoint(spectrum.normalized, fromToIndex);
    range.minPoint = xyMinYPoint(spectrum.normalized, fromToIndex);
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
