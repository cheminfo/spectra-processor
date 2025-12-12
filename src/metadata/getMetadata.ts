import type { Spectrum } from '../spectrum/Spectrum.js';

export interface GetMetadataOptions {
  /**
   * IDs of selected spectra
   */
  ids?: unknown[];
}

/**
 * Get metadata from spectra
 * @param spectra - Array of spectrum objects
 * @param options - Options for filtering spectra
 * @returns Array of metadata objects
 */
export function getMetadata(
  spectra: Spectrum[],
  options: GetMetadataOptions = {},
): Array<Record<string, any>> {
  const { ids } = options;

  const metadata: Array<Record<string, any>> = [];

  if (Array.isArray(spectra) && spectra.length > 0) {
    for (const spectrum of spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        metadata.push(spectrum.meta);
      }
    }
  }

  return metadata;
}
