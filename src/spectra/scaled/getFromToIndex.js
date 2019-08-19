import { X } from 'ml-spectra-processing';

export function getFromToIndex(xs, range) {
  let { from, to } = range;
  if (from === undefined) {
    from = xs[0];
  }
  if (to === undefined) {
    to = xs[xs.length - 1];
  }

  return {
    fromIndex: X.findClosestIndex(xs, from),
    toIndex: X.findClosestIndex(xs, to)
  };
}
