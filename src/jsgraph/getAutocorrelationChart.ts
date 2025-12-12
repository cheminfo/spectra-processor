import type { DoubleArray } from 'cheminfo-types';
import { scale } from 'chroma-js';
import type { XYFilterXOptions } from 'ml-spectra-processing';
import { xMinMaxValues, xyFilterX } from 'ml-spectra-processing';

import type { SpectraProcessor } from '../SpectraProcessor.js';

export interface AutocorrelationData {
  x: DoubleArray;
  y: Float64Array | DoubleArray;
}

export interface GetAutocorrelationChartOptions {
  /**
   * Precalculated autocorrelation {x,y}
   */
  autocorrelation?: AutocorrelationData;
  /**
   * IDs of the spectra to select, by default all
   */
  ids?: unknown[];
  /**
   * Filter options for x values
   */
  xFilter?: XYFilterXOptions;
}

export interface ColorSpectrum {
  type: string;
  x: DoubleArray;
  y: number[];
  color: string[];
  styles: {
    unselected: {
      lineWidth: number;
      lineStyle: number;
    };
    selected: {
      lineWidth: number;
      lineStyle: number;
    };
  };
}

/**
 * Retrieve a chart with autocorrelation color
 * @param spectraProcessor - SpectraProcessor instance
 * @param index - Index in the spectrum
 * @param options - Chart options
 * @returns Color spectrum chart object
 */
export function getAutocorrelationChart(
  spectraProcessor: SpectraProcessor,
  index: number,
  options: GetAutocorrelationChartOptions = {},
): ColorSpectrum {
  const {
    autocorrelation = spectraProcessor.getAutocorrelation(index, options),
    xFilter,
    ids,
  } = options;

  const { min, max } = xMinMaxValues(autocorrelation.y);
  const colorCallback = scale(['blue', 'cyan', 'yellow', 'red'])
    .domain([min, max])
    .mode('lch');

  // Annoying but it seems the color library does not handle TypedArray well
  const ys = ArrayBuffer.isView(autocorrelation.y)
    ? Array.from(autocorrelation.y)
    : autocorrelation.y;

  const colorScale = ys.map((y) => `rgb(${colorCallback(y).rgb().join(',')})`);

  let mean = spectraProcessor.getMeanData({ ids });
  if (xFilter) {
    mean = xyFilterX({ x: mean.x, y: mean.y }, xFilter);
  }

  const colorSpectrum: ColorSpectrum = {
    type: 'color',
    x: mean.x,
    y: mean.y,
    color: colorScale,
    styles: {
      unselected: {
        lineWidth: 1,
        lineStyle: 1,
      },
      selected: {
        lineWidth: 3,
        lineStyle: 1,
      },
    },
  };

  return colorSpectrum;
}
