import type { SpectraProcessor } from '../SpectraProcessor.js';

import type { GetPostProcessedDataOptions } from './getPostProcessedData.js';
import { getPostProcessedData } from './getPostProcessedData.js';
import type { ConvertToTextOptions } from './util/convertToText.js';
import { convertToText } from './util/convertToText.js';

export interface GetPostProcessedTextOptions extends ConvertToTextOptions {
  /**
   * Post processing options
   */
  postProcessing?: GetPostProcessedDataOptions;
}

/**
 * Get post-processed data as text
 * @param spectraProcessor - SpectraProcessor instance
 * @param options - Options for post-processing and formatting
 * @returns Text representation of post-processed data
 */
export function getPostProcessedText(
  spectraProcessor: SpectraProcessor,
  options: GetPostProcessedTextOptions = {},
): string {
  const { fs = '\t', rs = '\n', postProcessing: postProcessingOptions = {} } =
    options;
  const data = getPostProcessedData(spectraProcessor, postProcessingOptions);
  
  // Only convert if we have valid data
  if (!data.matrix || !data.x || !data.ids || !data.meta) {
    return '';
  }
  
  return convertToText(
    {
      matrix: data.matrix,
      x: data.x,
      ids: data.ids,
      meta: data.meta,
    },
    {
      rs,
      fs,
    },
  );
}
