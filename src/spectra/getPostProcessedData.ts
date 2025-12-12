import type { DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix, PointWithIndex, XYFilterXOptions } from 'ml-spectra-processing';
import {
  matrixCenterZMean,
  matrixPQN,
  matrixZRescale,
  xSubtract,
  xSum,
  xyMaxYPoint,
} from 'ml-spectra-processing';
import hash from 'object-hash';

import type { SpectraProcessor } from '../SpectraProcessor.js';

import type { GetNormalizedDataOptions } from './getNormalizedData.js';
import { getNormalizedData } from './getNormalizedData.js';
import type { Range } from './scaled/getFromToIndex.js';
import { getFromToIndex } from './scaled/getFromToIndex.js';
import { integration } from './scaled/integration.js';
import { max } from './scaled/max.js';
import { min } from './scaled/min.js';
import { minMax } from './scaled/minMax.js';

export interface FilterOptions {
  name?: string;
  options?: any;
}

export interface ScaleOptions {
  targetID?: string;
  method?: string;
  range?: Range;
  relative?: boolean;
}

export interface RangeWithLabel extends Range {
  label?: string;
  integration?: number;
  maxPoint?: PointWithIndex;
}

export interface Calculation {
  label: string;
  formula: string;
}

export interface GetPostProcessedDataOptions extends GetNormalizedDataOptions {
  /**
   * Array of filter objects with name and options
   */
  filters?: FilterOptions[];
  /**
   * Scale options for rescaling spectra
   */
  scale?: ScaleOptions;
  /**
   * Array of range objects with from, to, and label
   */
  ranges?: RangeWithLabel[];
  /**
   * Array of calculation objects with label and formula
   */
  calculations?: Calculation[];
  /**
   * Filter options for x values
   */
  xFilter?: XYFilterXOptions;
}

export interface PostProcessedDataResult {
  ids?: unknown[];
  matrix?: DoubleMatrix;
  meta?: Array<Record<string, any>>;
  x?: DoubleArray;
  ranges?: Array<Record<string, RangeWithLabel>>;
  calculations?: Array<Record<string, number>>;
  optionsHash?: string;
  weakMap?: WeakMap<any, boolean>;
}

let cache: PostProcessedDataResult = {};

/**
 * Calculate post-processed data with various transformations and calculations
 * @param spectraProcessor - SpectraProcessor instance
 * @param options - Processing options
 * @returns Post-processed data
 */
export function getPostProcessedData(
  spectraProcessor: SpectraProcessor,
  options: GetPostProcessedDataOptions = {},
): PostProcessedDataResult {
  const optionsHash = hash(options);

  if (!spectraProcessor.spectra || spectraProcessor.spectra.length === 0)
    {return {};}
  const { scale = {}, ids, ranges, calculations, filters = [] } = options;

  const { range, targetID, relative, method = '' } = scale;

  const spectra = spectraProcessor.getSpectra(ids);

  // Check if we can reuse the cache
  if (cache.optionsHash === optionsHash) {
    let validCache = true;
    for (const spectrum of spectra) {
      if (!cache.weakMap?.get(spectrum.normalized)) validCache = false;
    }
    if (validCache) return cache;
  }
  const weakMap = new WeakMap<any, boolean>();
  for (const spectrum of spectra) {
    weakMap.set(spectrum.normalized, true);
  }

  const normalizedData = getNormalizedData(spectra);

  for (const filter of filters) {
    switch (filter.name) {
      case 'pqn': {
        normalizedData.matrix = matrixPQN(
          normalizedData.matrix,
          filter.options,
        ).data;
        break;
      }
      case 'centerMean': {
        normalizedData.matrix = matrixCenterZMean(normalizedData.matrix);
        break;
      }
      case 'rescale': {
        normalizedData.matrix = matrixZRescale(
          normalizedData.matrix,
          filter.options,
        );
        break;
      }
      case '':
      case undefined:
        break;
      default:
        throw new Error(`Unknown matrix filter name: ${filter.name}`);
    }
  }

  const normalizedTarget = targetID
    ? spectraProcessor.getSpectrum(targetID)?.normalized
    : spectraProcessor.spectra[0].normalized;

  if (!normalizedTarget) {
    throw new Error('No normalized target found');
  }

  if (method) {
    switch (method.toLowerCase()) {
      case 'min':
        min(normalizedData.matrix, normalizedTarget, range);
        break;
      case 'max':
        max(normalizedData.matrix, normalizedTarget, range);
        break;
      case 'minmax':
        minMax(normalizedData.matrix, normalizedTarget, range);
        break;
      case 'integration':
        integration(normalizedData.matrix, normalizedTarget, range);
        break;
      default:
        throw new Error(`getPostProcessedData: unknown method: ${method}`);
    }
  }

  if (relative) {
    for (let i = 0; i < normalizedData.matrix.length; i++) {
      normalizedData.matrix[i] = xSubtract(
        normalizedData.matrix[i],
        normalizedTarget.y,
      );
    }
  }

  const result: PostProcessedDataResult = normalizedData;

  if (ranges) {
    result.ranges = [];
    for (const spectrum of normalizedData.matrix) {
      const rangesCopy = structuredClone(ranges);
      const yNormalized = spectrum;
      const resultRanges: Record<string, RangeWithLabel> = {};
      result.ranges.push(resultRanges);
      for (const currentRange of rangesCopy) {
        if (currentRange.label) {
          const fromToIndex = getFromToIndex(
            normalizedTarget.x as DoubleArray,
            currentRange,
          );

          const deltaX = normalizedTarget.x[1] - normalizedTarget.x[0];

          currentRange.integration = xSum(yNormalized, fromToIndex) * deltaX;
          currentRange.maxPoint = xyMaxYPoint(
            { x: normalizedData.x, y: yNormalized },
            fromToIndex,
          );
          resultRanges[currentRange.label] = currentRange;
        }
      }
    }
  }

  if (calculations && result.ranges) {
    result.calculations = result.ranges.map(() => {
      return {};
    });
    const parameters = Object.keys(result.ranges[0]);
    for (const calculation of calculations) {
      // eslint-disable-next-line no-new-func
      const callback = new Function(
        ...parameters,
        `return ${calculation.formula}`,
      );
      for (let i = 0; i < result.ranges.length; i++) {
        const oneRanges = result.ranges[i];
        const values = parameters.map((key) => oneRanges[key].integration);
        result.calculations[i][calculation.label] = callback(...values);
      }
    }
  }

  cache = { ...result, optionsHash, weakMap };
  return cache;
}
