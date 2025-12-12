import type { DataXY } from 'cheminfo-types';

import type { Spectrum } from '../spectrum/Spectrum.js';

export interface ChartDataStyles {
  unselected: {
    lineColor: string;
    lineWidth: number;
    lineStyle: number;
  };
  selected: {
    lineColor: string;
    lineWidth: number;
    lineStyle: number;
  };
}

export interface ChartData extends DataXY {
  styles?: ChartDataStyles;
  label?: string;
}

/**
 * Add chart data styling based on spectrum metadata
 * @param data - Data object to style
 * @param spectrum - Spectrum with metadata
 */
export function addChartDataStyle(
  data: ChartData,
  spectrum: Spectrum | { meta: Record<string, any>; id: unknown },
): void {
  data.styles = {
    unselected: {
      lineColor: spectrum.meta.color || 'darkgrey',
      lineWidth: 1,
      lineStyle: 1,
    },
    selected: {
      lineColor: spectrum.meta.color || 'darkgrey',
      lineWidth: 3,
      lineStyle: 1,
    },
  };
  data.label = spectrum.meta.id || String(spectrum.id);
}
