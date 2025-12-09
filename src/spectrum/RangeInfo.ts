import type { NumberArray } from 'cheminfo-types';
import type { PointWithIndex } from 'ml-spectra-processing';

/**
 * Range information object
 */
export interface RangeInfo {
  label: string;
  from: number;
  to: number;
  deltaX?: number;
  baseline?: number;
  integration?: number;
  correctedIntegration?: number;
  maxPoint?: PointWithIndex;
  minPoint?: PointWithIndex;
  x?: NumberArray;
  y?: NumberArray;
}
