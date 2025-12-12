import type { DoubleArray } from 'cheminfo-types';
import { scale } from 'chroma-js';
import { Matrix } from 'ml-matrix';
import { xMinMaxValues } from 'ml-spectra-processing';

import type { NormalizedData } from '../spectra/getBoxPlotData.js';
import { getBoxPlotData } from '../spectra/getBoxPlotData.js';

export interface AnnotationPosition {
  x: number | string;
  y: number | string;
}

export interface Annotation {
  type: string;
  layer?: number;
  properties?: {
    fillColor?: string;
    fillOpacity?: number;
    strokeWidth?: number;
    strokeColor?: string;
    position?: AnnotationPosition[];
  };
}

export interface ColorSpectrum {
  type: string;
  data: {
    x: DoubleArray;
    y: Float64Array;
    color: string[];
  };
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
  annotations: Annotation[];
}

export interface GetBoxPlotChartOptions {
  /**
   * Fill color for Q1-Q3 region
   * @default '#000'
   */
  q13FillColor?: string;
  /**
   * Fill opacity for Q1-Q3 region
   * @default 0.3
   */
  q13FillOpacity?: number;
  /**
   * Stroke color for median line (empty string uses color gradient)
   * @default ''
   */
  medianStrokeColor?: string;
  /**
   * Stroke width for median line
   * @default 3
   */
  medianStrokeWidth?: number;
  /**
   * Fill color for min-max region
   * @default '#000'
   */
  minMaxFillColor?: string;
  /**
   * Fill opacity for min-max region
   * @default 0.15
   */
  minMaxFillOpacity?: number;
}

/**
 * Get box plot chart from normalized data
 * @param normalizedData - Normalized data with x and matrix
 * @param options - Chart styling options
 * @returns Color spectrum chart object
 */
export function getBoxPlotChart(
  normalizedData: NormalizedData,
  options: GetBoxPlotChartOptions = {},
): ColorSpectrum {
  const {
    q13FillColor = '#000',
    q13FillOpacity = 0.3,
    medianStrokeColor = '',
    medianStrokeWidth = 3,
    minMaxFillColor = '#000',
    minMaxFillOpacity = 0.15,
  } = options;
  const annotations: Annotation[] = [];

  const boxPlotData = getBoxPlotData(normalizedData);

  if (q13FillOpacity && q13FillColor) {
    const q13: AnnotationPosition[] = [];
    for (let i = 0; i < boxPlotData.x.length; i++) {
      q13.push({
        x: boxPlotData.x[i],
        y: boxPlotData.q1[i],
      });
    }
    for (let i = boxPlotData.x.length - 1; i >= 0; i--) {
      q13.push({
        x: boxPlotData.x[i],
        y: boxPlotData.q3[i],
      });
    }
    annotations.push({
      type: 'polygon',
      layer: 0,
      properties: {
        fillColor: q13FillColor,
        fillOpacity: q13FillOpacity,
        strokeWidth: 0.0000001,
        position: q13,
      },
    });
  }

  if (minMaxFillColor && minMaxFillOpacity) {
    const minMax: AnnotationPosition[] = [];
    for (let i = 0; i < boxPlotData.x.length; i++) {
      minMax.push({
        x: boxPlotData.x[i],
        y: boxPlotData.min[i],
      });
    }
    for (let i = boxPlotData.x.length - 1; i >= 0; i--) {
      minMax.push({
        x: boxPlotData.x[i],
        y: boxPlotData.max[i],
      });
    }

    annotations.push({
      type: 'polygon',
      layer: 0,
      properties: {
        fillColor: minMaxFillColor,
        fillOpacity: minMaxFillOpacity,
        strokeWidth: 0.0000001,
        strokeColor: '#FFF',
        position: minMax,
      },
    });
  }

  const colorSpectrum: ColorSpectrum = {
    type: 'color',
    data: {
      x: boxPlotData.x,
      y: boxPlotData.median,
      color: medianStrokeColor
        ? new Array(boxPlotData.x.length).fill(medianStrokeColor)
        : getColors(normalizedData.matrix),
    },
    styles: {
      unselected: {
        lineWidth: medianStrokeWidth,
        lineStyle: 1,
      },
      selected: {
        lineWidth: medianStrokeWidth,
        lineStyle: 1,
      },
    },
    annotations,
  };

  return colorSpectrum;
}

function getColors(dataset: number[][]): string[] {
  const matrix = new Matrix(dataset);
  const stdevs = matrix.standardDeviation('column');
  const { min, max } = xMinMaxValues(stdevs);
  const colorCallback = scale(['blue', 'cyan', 'yellow', 'red'])
    .domain([min, max])
    .mode('lch');

  const colors = stdevs.map((y) => `rgb(${colorCallback(y).rgb().join(',')})`);
  return colors;
}
