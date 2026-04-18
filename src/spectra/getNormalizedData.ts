import type { DoubleArray, DoubleMatrix } from 'cheminfo-types';

import type { Spectrum } from '../spectrum/Spectrum.ts';

export interface GetNormalizedDataOptions {
  /**
   * IDs of selected spectra
   */
  ids?: string[];
}

export interface NormalizedDataResult {
  ids: string[];
  meta: Array<Record<string, any>>;
  x: DoubleArray;
  matrix: DoubleMatrix;
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
  const currentIDs: string[] = [];
  let x: DoubleArray = [];

  if (Array.isArray(spectra) && spectra.length > 0) {
    for (const spectrum of spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        currentIDs.push(spectrum.id);
        matrix.push(spectrum.normalized.y);
        meta.push(spectrum.meta);
      }
    }
    x = spectra[0].normalized.x;
  }

  return { ids: currentIDs, matrix, meta, x };
}
