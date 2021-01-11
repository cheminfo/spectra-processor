import { getPostProcessedData } from './getPostProcessedData.js';
import { convertToText } from './util/convertToText.js';

/**
 * @private
 * @param {SpectraProcessor} spectraProcessor
 * @param {object} [options={}]
 * @param {string} [options.fs='\t'] field separator
 * @param {string} [options.rs='\n'] record (line) separator
 * @param {object} [options.postProcessing={}] post processing options
 */

export function getPostProcessedText(spectraProcessor, options = {}) {
  let {
    fs = '\t',
    rs = '\n',
    postProcessing: postProcessingOptions = {},
  } = options;
  return convertToText(
    getPostProcessedData(spectraProcessor, postProcessingOptions),
    {
      rs,
      fs,
    },
  );
}
