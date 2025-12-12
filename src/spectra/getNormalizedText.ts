import type { Spectrum } from '../spectrum/Spectrum.js';

import type { GetNormalizedDataOptions } from './getNormalizedData.js';
import { getNormalizedData } from './getNormalizedData.js';
import type { ConvertToTextOptions } from './util/convertToText.js';
import { convertToText } from './util/convertToText.js';

export interface GetNormalizedTextOptions
  extends GetNormalizedDataOptions,
    ConvertToTextOptions {}

/**
 * Get normalized data as text
 * @param spectra - Array of spectrum objects
 * @param options - Options for filtering and formatting
 * @returns Text representation of normalized data
 */
export function getNormalizedText(
  spectra: Spectrum[],
  options: GetNormalizedTextOptions = {},
): string {
  const { fs = '\t', rs = '\n' } = options;

  return convertToText(getNormalizedData(spectra, options), {
    rs,
    fs,
  });
}
