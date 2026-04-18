import type { DataXY } from 'cheminfo-types';
import type { XYFilterXOptions } from 'ml-spectra-processing';
import { xyFilterX } from 'ml-spectra-processing';

import type { Spectrum } from '../spectrum/Spectrum.ts';

import type { Chart, ChartData } from './addChartDataStyle.ts';
import { addChartDataStyle } from './addChartDataStyle.ts';

export interface GetNormalizedChartOptions {
  /**
   * Filter options for x values
   */
  xFilter?: XYFilterXOptions;
}

/**
 * Get chart with normalized data
 * @param spectra - Array of spectrum objects
 * @param options - Chart options
 * @returns Chart object with normalized data
 */
export function getNormalizedChart(
  spectra: Spectrum[],
  options: GetNormalizedChartOptions = {},
): Chart {
  const { xFilter } = options;
  const chart: Chart = {
    data: [],
  };
  for (const spectrum of spectra) {
    let data: DataXY & ChartData = spectrum.normalized;
    if (xFilter) {
      data = xyFilterX(data, xFilter) as DataXY & ChartData;
    }
    addChartDataStyle(data, spectrum);
    chart.data.push(data);
  }
  return chart;
}
