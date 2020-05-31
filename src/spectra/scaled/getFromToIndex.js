import { xFindClosestIndex } from 'ml-spectra-processing';

export function getFromToIndex(xs, range) {
  let { from, to } = range;
  if (from === undefined) {
    from = xs[0];
  }
  if (to === undefined) {
    to = xs[xs.length - 1];
  }

  return {
    fromIndex: xFindClosestIndex(xs, from),
    toIndex: xFindClosestIndex(xs, to),
  };
}
