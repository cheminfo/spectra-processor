import type { DoubleArray } from 'cheminfo-types';
import type { DoubleMatrix } from 'ml-spectra-processing';

export interface ParseMatrixOptions {
  /**
   * Field separator
   * @default '\t'
   */
  fs?: string;
}

export interface ParseMatrixResult {
  x: DoubleArray;
  meta: Array<Record<string, any>>;
  matrix: DoubleMatrix;
  ids: string[];
}

/**
 * Parse a matrix from text format
 * @param text - String containing the text data
 * @param options - Parsing options
 * @returns Parsed matrix data with x, meta, matrix, and ids
 */
export default function parseMatrix(
  text: string,
  options: ParseMatrixOptions = {},
): ParseMatrixResult {
  const lines = text.split(/[\n\r]+/).filter(Boolean);
  const { fs = '\t' } = options;
  const currentMatrix: DoubleMatrix = [];
  const ids: string[] = [];
  const meta: Array<Record<string, any>> = [];
  let x: DoubleArray = [];

  const headers = lines[0].split(fs);
  const labels: string[] = [];
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    if (Number.isNaN(Number(header))) {
      labels[i] = header;
    } else {
      x = headers.slice(i).map(Number);
      break;
    }
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split('\t');
    ids.push(parts[0]);
    const oneMeta: Record<string, any> = {};
    meta.push(oneMeta);
    for (let j = 1; j < parts.length; j++) {
      if (j < labels.length) {
        oneMeta[labels[j]] = parts[j];
      } else {
        currentMatrix.push(parts.slice(labels.length).map(Number));
        break;
      }
    }
  }
  return { x, meta, matrix: currentMatrix, ids };
}
