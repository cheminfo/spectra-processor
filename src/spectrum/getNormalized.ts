import type { FilterXYType } from 'ml-signal-processing';
import { filterXY } from 'ml-signal-processing';
import { xMinMaxValues, xyCheck } from 'ml-spectra-processing';

interface NormalizeOptions {
  from?: number;
  to?: number;
  numberOfPoints?: number;
  filters?: FilterXYType[];
  exclusions?: any[];
  applyRangeSelectionFirst?: boolean;
}

interface AllowedBoundary {
  x: {
    min: number;
    max: number;
  };
  y: {
    min: number;
    max: number;
  };
}

interface NormalizeResult {
  data: Record<string, any>;
  allowedBoundary: AllowedBoundary;
}

/**
 *
 * @private
 * @param input
 * @param [options={}]
 */
export function getNormalized(
  input: Record<string, any>,
  options: NormalizeOptions = {},
): NormalizeResult {
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
