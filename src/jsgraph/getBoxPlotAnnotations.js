import { getBoxPlotData } from '../spectra/getBoxPlotData';

export function getBoxPlotAnnotations(spectra, options = {}) {
  const {
    q13FillColor = '#FF0',
    q13FillOpacity = 0.4,
    q2StrokeColor = 'red',
    q2StrokeWidth = 3,
    minMaxFillColor = '#FF0',
    minMaxFillOpacity = '0.2'
  } = options;
  let annotations = [];

  let data = getBoxPlotData(spectra);
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

  return annotations;
}
