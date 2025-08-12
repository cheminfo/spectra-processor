import { scale } from 'chroma-js';
import { Matrix } from 'ml-matrix';
import { xMinMaxValues } from 'ml-spectra-processing';

import { getBoxPlotData } from '../spectra/getBoxPlotData';

export function getBoxPlotChart(normalizedData, options = {}) {
  const {
    q13FillColor = '#000',
    q13FillOpacity = 0.3,
    medianStrokeColor = '',
    medianStrokeWidth = 3,
    minMaxFillColor = '#000',
    minMaxFillOpacity = 0.15,
  } = options;
  let annotations = [];

  const boxPlotData = getBoxPlotData(normalizedData);

  if (q13FillOpacity && q13FillColor) {
    let q13 = [];
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
    let minMax = [];
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

  let colorSpectrum = {
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

function getColors(dataset) {
  const matrix = new Matrix(dataset);
  const stdevs = matrix.standardDeviation('column');
  const { min, max } = xMinMaxValues(stdevs);
  const colorCallback = scale(['blue', 'cyan', 'yellow', 'red'])
    .domain([min, max])
    .mode('lch');

  const colors = stdevs.map((y) => `rgb(${colorCallback(y).rgb().join(',')})`);
  return colors;
}
