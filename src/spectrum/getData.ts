import type { XYFilterXOptions } from 'ml-spectra-processing';
import { xyFilterX } from 'ml-spectra-processing';

import type { Spectrum } from './Spectrum.js';

export interface DataOptions {
  /**
   * Filter options for x values
   */
  xFilter?: XYFilterXOptions;

  /**
   * Multiplication factor for y values
   * @default 1
   */
  yFactor?: number;
}

export interface Data {
  x: number[];
  y: number[];
}

/**
 * Get spectrum data with optional filtering and scaling
 * @param spectrum - The spectrum object containing x and y arrays
 * @param options - Configuration options
 * @returns Data object with filtered/scaled x and y arrays
 */
export function getData(spectrum: Spectrum, options: DataOptions = {}): Data {
  const { xFilter = {}, yFactor = 1 } = options;
  let data: Data = { x: spectrum.x, y: spectrum.y };

  if (xFilter) {
    data = xyFilterX(spectrum, xFilter);
  }
  if (yFactor && yFactor !== 1) {
    data.y = data.y.map((y) => y * yFactor);
  }
  return data;
}
