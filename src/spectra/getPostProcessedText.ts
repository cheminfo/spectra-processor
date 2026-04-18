import type { SpectraProcessor } from '../SpectraProcessor.ts';

import type { GetPostProcessedDataOptions } from './getPostProcessedData.ts';
import { getPostProcessedData } from './getPostProcessedData.ts';
import type { ConvertToTextOptions } from './util/convertToText.ts';
import { convertToText } from './util/convertToText.ts';

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
  const {
    fs = '\t',
    rs = '\n',
    postProcessing: postProcessingOptions = {},
  } = options;
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
