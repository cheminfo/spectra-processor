import type { SpectraProcessor } from '../SpectraProcessor.js';
import type { GetPostProcessedDataOptions } from '../spectra/getPostProcessedData.js';

import type { Chart, ChartData } from './addChartDataStyle.js';
import { addChartDataStyle } from './addChartDataStyle.js';

/**
 * Get chart with post-processed data
 * @param spectraProcessor - SpectraProcessor instance
 * @param options - Post-processing options
 * @returns Chart object with post-processed data
 */
export function getPostProcessedChart(
  spectraProcessor: SpectraProcessor,
  options: GetPostProcessedDataOptions = {},
): Chart {
  const scaled = spectraProcessor.getPostProcessedData(options);

  const chart: Chart = {
    data: [],
  };
  if (!scaled?.matrix || !scaled.x || !scaled.meta || !scaled.ids) return chart;

  for (let i = 0; i < scaled.matrix.length; i++) {
    const data: ChartData = {
      x: scaled.x,
      y: Array.from(scaled.matrix[i]), // need to ensure not a typed array
    };
    addChartDataStyle(data, { meta: scaled.meta[i], id: scaled.ids[i] });
    chart.data.push(data);
  }

  return chart;
}
