import type { DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix } from 'ml-spectra-processing';

export interface ConvertToTextOptions {
  /**
   * Field separator
   * @default '\t'
   */
  fs?: string;
  /**
   * Record (line) separator
   * @default '\n'
   */
  rs?: string;
}

export interface DataWithMeta {
  matrix: DoubleMatrix;
  meta: Array<Record<string, any>>;
  ids: unknown[];
  x: DoubleArray;
}

/**
 * Convert data to text format
 * @param data - Data including matrix, meta, ids, and x values
 * @param options - Conversion options
 * @returns Formatted text string
 */
export function convertToText(
  data: DataWithMeta,
  options: ConvertToTextOptions = {},
): string {
  const { fs = '\t', rs = '\n' } = options;
  const { matrix, meta, ids, x } = data;
  const allKeysObject: Record<string, boolean> = {};
  for (const metum of meta) {
    if (metum) {
      for (const key of Object.keys(metum)) {
        const type = typeof metum[key];
        if (type === 'number' || type === 'string' || type === 'boolean') {
          allKeysObject[key] = true;
        }
      }
    }
  }
  const allKeys = Object.keys(allKeysObject);

  const lines: string[] = [];
  let line: Array<string | number> = ['id', ...allKeys, ...x];
  lines.push(line.join(fs));

  for (let i = 0; i < ids.length; i++) {
    line = [ids[i] as string];
    for (const key of allKeys) {
      line.push(removeSpecialCharacters(meta[i][key]));
    }
    line.push(...matrix[i]);
    lines.push(line.join(fs));
  }
  return lines.join(rs);
}

function removeSpecialCharacters(value: any): any {
  if (typeof value !== 'string') {
    return value;
  }
  return value.replaceAll(/[\t\n\r]+/g, ' ');
}
