import type { DataXY, DoubleArray, FromTo } from 'cheminfo-types';
import type { FilterXYType } from 'ml-signal-processing';
import { filterXY } from 'ml-signal-processing';
import { xMinMaxValues, xyCheck } from 'ml-spectra-processing';

interface NormalizeOptions {
  from?: number;
  to?: number;
  numberOfPoints?: number;
  filters?: FilterXYType[];
  exclusions?: FromTo[];
  applyRangeSelectionFirst?: boolean;
}

export interface AllowedBoundary {
  x: {
    min: number;
    max: number;
  };
  y: {
    min: number;
    max: number;
  };
}

export interface NormalizedResult {
  data: DataXY<DoubleArray>;
  allowedBoundary: AllowedBoundary;
}

/**
 * Apply the configured filters and resample on an equally spaced x grid.
 * @param input - The original data with x and y arrays
 * @param options - Normalization options (range, number of points, filters, exclusions)
 * @returns The normalized data and the allowed x/y boundary
 */
export function getNormalized(
  input: DataXY,
  options: NormalizeOptions = {},
): NormalizedResult {
  xyCheck(input);

  let { filters = [] } = options;
  const {
    from = input.x[0],
    to = input.x.at(-1),
    numberOfPoints = 1024,
    applyRangeSelectionFirst = false,
    exclusions = [],
  } = options;

  filters = structuredClone(filters);
  const equallySpacedFilter: FilterXYType = {
    name: 'equallySpaced',
    options: {
      from,
      to,
      numberOfPoints,
      exclusions,
    },
  };
  if (applyRangeSelectionFirst) {
    filters.unshift(equallySpacedFilter);
  } else {
    filters.push(equallySpacedFilter);
  }
  const output = filterXY(input, filters).data;

  const allowedBoundary = {
    x: {
      min: output.x[0],
      max: output.x.at(-1) as number,
    },
    y: xMinMaxValues(output.y),
  };

  return {
    data: output,
    allowedBoundary,
  };
}
