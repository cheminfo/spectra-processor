import type { DoubleArray } from 'cheminfo-types';
import { xFindClosestIndex } from 'ml-spectra-processing';

export interface Range {
  from?: number;
  to?: number;
}

export interface FromToIndex {
  fromIndex: number;
  toIndex: number;
}

/**
 * Get the from and to indices for a given range
 * @param xs - Array of x values
 * @param range - Range with optional from/to values
 * @returns Object with fromIndex and toIndex
 */
export function getFromToIndex(xs: DoubleArray, range: Range): FromToIndex {
  let { from, to } = range;
  if (from === undefined) {
    from = xs[0];
  }
  if (to === undefined) {
    to = xs.at(-1) as number;
  }

  return {
    fromIndex: xFindClosestIndex(xs, from),
    toIndex: xFindClosestIndex(xs, to),
  };
}
