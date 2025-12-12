import type { DataXY } from 'cheminfo-types';
import { parseXY } from 'xy-parser';

import type { Kind } from '../Kinds.js';

export interface ParseTextOptions {
  /**
   * Kind object defining conversion and display options
   */
  kind?: Kind;
  /**
   * Parser options to pass to xy-parser
   */
  parserOptions?: any;
}

export interface ParseTextResult {
  data: DataXY;
}

/**
 * Create a spectrum from a text file
 * @param value - String containing the text data
 * @param options - Parsing options
 * @returns Parsed data object
 */
export default function parseText(
  value: string,
  options: ParseTextOptions = {},
): ParseTextResult {
  const { kind, parserOptions = {} } = options;

  const data = parseXY(value, parserOptions);

  // Convert the data if needed
  if (kind?.importation?.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return { data };
}
