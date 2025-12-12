import type { XYFilterXOptions } from 'ml-spectra-processing';

import type { Spectrum } from '../spectrum/Spectrum.js';

import type { Chart, ChartData } from './addChartDataStyle.js';
import { addChartDataStyle } from './addChartDataStyle.js';

export interface GetChartOptions {
  /**
   * List of spectra ids, by default all
   */
  ids?: unknown[];
  /**
   * Y-axis multiplication factor
   * @default 1
   */
  yFactor?: number;
  /**
   * Filter options for x values
   */
  xFilter?: XYFilterXOptions;
}

/**
 * Retrieve a chart with selected original data
 * @param spectra - Array of spectrum objects
 * @param options - Chart options
 * @returns Chart object with data
 */
export function getChart(
  spectra: Spectrum[],
  options: GetChartOptions = {},
): Chart {
  const { ids, yFactor, xFilter = {} } = options;
  const chart: Chart = {
    data: [],
  };

  for (const spectrum of spectra) {
    if (!ids || ids.includes(spectrum.id)) {
      const data = spectrum.getData({ yFactor, xFilter });
      addChartDataStyle(data, spectrum);
      chart.data.push(data);
    }
  }
  return chart;
}
