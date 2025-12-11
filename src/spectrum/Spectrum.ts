import type { DataXY, NumberArray } from 'cheminfo-types';
import { xMinMaxValues } from 'ml-spectra-processing';

import type { RangeInfo } from './RangeInfo.ts';
import type { DataOptions } from './getData.js';
import { getData } from './getData.js';
import type { AllowedBoundary } from './getNormalized.js';
import { getNormalized } from './getNormalized.js';
import { updateRangesInfo } from './updateRangesInfo.js';

/**
 * Boundary information for x and y axes
 */
export interface AxisBoundary {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

/**
 * Memory usage statistics
 */
export interface MemoryStats {
  original: number;
  normalized: number;
  total: number;
}

/**
 * Options for Spectrum constructor
 */
export interface SpectrumOptions {
  meta?: Record<string, any>;
  normalization?: Record<string, any>;
  normalized?: DataXY;
}

/**
 * Class allowing manipulate one IR spectrum
 * @class spectrum
 * @param x - x values array
 * @param y - y values array
 * @param id - spectrum identifier
 * @param options - initialization options
 */
export class Spectrum {
  x: NumberArray;
  y: NumberArray;
  id: string;
  meta: Record<string, any>;
  normalizedBoundary: AxisBoundary;
  normalized: DataXY;
  normalizedAllowedBoundary?: AllowedBoundary;
  memory?: MemoryStats;
  ranges?: Record<string, any>;

  /**
   * Constructor for Spectrum
   * @param x - x values array
   * @param y - y values array
   * @param id - spectrum identifier
   * @param options - initialization options with meta, normalization, and normalized properties
   */
  constructor(
    x: number[],
    y: number[],
    id: string,
    options: SpectrumOptions = {},
  ) {
    const { meta = {}, normalization = {}, normalized } = options;

    if (x && x.length > 1 && x[0] > (x.at(-1) as number)) {
      this.x = x.toReversed();
      this.y = y.toReversed();
    } else {
      this.x = x || [];
      this.y = y || [];
    }
    this.id = id;
    this.meta = meta;
    this.normalizedBoundary = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    if (normalized) {
      this.normalized = normalized;
      this.updateNormalizedBoundary();
      this.normalizedAllowedBoundary = this.normalizedBoundary;
    } else {
      this.normalized = this.updateNormalization(normalization);
    }

    this.updateMemory();
  }

  /**
   * Get the minimum x value
   */
  get minX(): number {
    return this.x[0];
  }

  /**
   * Get the maximum x value
   */
  get maxX(): number {
    return this.x.at(-1) as number;
  }

  /**
   * Update memory usage statistics
   */
  updateMemory(): void {
    const original = (this.x?.length || 0) * 16;
    const normalizedMem = (this.normalized?.x?.length || 0) * 16;
    this.memory = {
      original,
      normalized: normalizedMem,
      total: original + normalizedMem,
    };
  }

  /**
   * Remove original x and y data
   */
  removeOriginal(): void {
    this.x = undefined as any;
    this.y = undefined as any;
    this.updateMemory();
  }

  /**
   * Get x and y arrays
   * @returns Object containing x and y arrays
   * @throws Error if x or y is not an array
   */
  getXY(): { x: number[]; y: number[] } {
    if (!Array.isArray(this.x) || !Array.isArray(this.y)) {
      throw new Error('Can not get normalized data');
    }
    return { x: this.x, y: this.y };
  }

  /**
   * Update ranges information
   * @param ranges - ranges configuration
   */
  updateRangesInfo(ranges: RangeInfo[]): void {
    updateRangesInfo(this, ranges);
  }

  /**
   * Update normalization
   * @param normalization - normalization configuration
   */
  updateNormalization(normalization: Record<string, any>): DataXY {
    const result = getNormalized(this, normalization);
    this.normalized = result.data;
    this.normalizedAllowedBoundary = result.allowedBoundary;
    this.ranges = {};
    this.updateMemory();
    this.updateNormalizedBoundary();
    return result.data;
  }

  /**
   * Get spectrum data with optional filtering and scaling
   * @param options - options for data retrieval
   * @returns Data object with x and y arrays
   */
  getData(options?: DataOptions): DataXY {
    return getData(this, options);
  }

  /**
   * Update normalized boundary values
   */
  updateNormalizedBoundary(): void {
    this.normalizedBoundary.x = {
      min: this.normalized.x[0],
      max: this.normalized.x.at(-1) as number,
    };
    this.normalizedBoundary.y = xMinMaxValues(this.normalized.y);
  }
}
