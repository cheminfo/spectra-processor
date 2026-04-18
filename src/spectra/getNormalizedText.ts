import type { Spectrum } from '../spectrum/Spectrum.ts';

import type { GetNormalizedDataOptions } from './getNormalizedData.ts';
import { getNormalizedData } from './getNormalizedData.ts';
import type { ConvertToTextOptions } from './util/convertToText.ts';
import { convertToText } from './util/convertToText.ts';

export interface GetNormalizedTextOptions
  extends GetNormalizedDataOptions, ConvertToTextOptions {}

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
