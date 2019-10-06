import { getBoxPlotData } from '../spectra/getBoxPlotData';

export function getBoxPlotAnnotations(spectra, options = {}) {
  const {
    q13FillColor = '#000',
    q13FillOpacity = 0.3,
    q2StrokeColor = '#000',
    q2StrokeWidth = 3,
    minMaxFillColor = '#000',
    minMaxFillOpacity = 0.15
  } = options;
  let annotations = [];

  let data = getBoxPlotData(spectra);
  if (q13FillOpacity && q13FillColor) {
    let q13 = [];
    for (let i = 0; i < data.x.length; i++) {
      q13.push({
        x: data.x[i],
        y: data.Q1[i]
      });
    }
    for (let i = data.x.length - 1; i >= 0; i--) {
      q13.push({
        x: data.x[i],
        y: data.Q3[i]
      });
    }
    annotations.push({
      type: 'polygon',
      layer: 0,
      properties: {
        fillColor: q13FillColor,
        fillOpacity: q13FillOpacity,
        strokeWidth: 0.0000001,
        position: q13
      }
    });
  }

  if (q2StrokeColor && q2StrokeWidth) {
    let q2 = [];
    for (let i = 0; i < data.x.length; i++) {
      q2.push({
        x: data.x[i],
        y: data.Q2[i]
      });
    }
    // Temp code because polyline is not working
    for (let i = data.x.length - 1; i >= 0; i--) {
      q2.push({
        x: data.x[i],
        y: data.Q2[i]
      });
    }

    annotations.push({
      type: 'polygon',
      layer: 0,
      properties: {
        strokeWidth: q2StrokeWidth,
        strokeColor: q2StrokeColor,
        position: q2
      }
    });
  }

  if (minMaxFillColor && minMaxFillOpacity) {
    let minMax = [];
    for (let i = 0; i < data.x.length; i++) {
      minMax.push({
        x: data.x[i],
        y: data.min[i]
      });
    }
    for (let i = data.x.length - 1; i >= 0; i--) {
      minMax.push({
        x: data.x[i],
        y: data.max[i]
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
        position: minMax
      }
    });
  }

  return annotations;
}
