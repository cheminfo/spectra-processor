import type { DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix } from 'ml-spectra-processing';

import type { Spectrum } from '../spectrum/Spectrum.js';

export interface GetNormalizedDataOptions {
  /**
   * IDs of selected spectra
   */
  ids?: unknown[];
}

export interface NormalizedDataResult {
  ids: unknown[];
  matrix: DoubleMatrix;
  meta: Array<Record<string, any>>;
  x: DoubleArray;
}

/**
 * Get normalized data from spectra
 * @param spectra - Array of spectrum objects
 * @param options - Options for filtering spectra
 * @returns Normalized data with ids, matrix, meta, and x values
 */
export function getNormalizedData(
  spectra: Spectrum[],
  options: GetNormalizedDataOptions = {},
): NormalizedDataResult {
  const { ids } = options;

  const matrix: DoubleMatrix = [];
  const meta: Array<Record<string, any>> = [];
  const currentIDs: unknown[] = [];
  let x: DoubleArray = [];

  if (Array.isArray(spectra) && spectra.length > 0) {
    for (const spectrum of spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        currentIDs.push(spectrum.id);
        matrix.push(spectrum.normalized.y as DoubleArray);
        meta.push(spectrum.meta);
      }
    }
    x = spectra[0].normalized.x as DoubleArray;
  }

  return { ids: currentIDs, matrix, meta, x };
}
