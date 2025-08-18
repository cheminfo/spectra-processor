import { getNormalizedData } from '../spectra/getNormalizedData.js';

export function getTrackAnnotation(spectra, index, options = {}) {
  const { ids, showSpectrumID = true, sortY = true, limit = 20 } = options;
  let annotations = [];

  let normalized = getNormalizedData(spectra, { ids });

  if (normalized.ids.length === 0) return annotations;
  let line = 0;

  // header containing X coordinate
  annotations.push({
    type: 'line',
    position: [
      { x: `${70}px`, y: `${15 + 15 * line}px` },
      { x: `${85}px`, y: `${15 + 15 * line}px` },
    ],
    strokeWidth: 0.0000001,
    label: {
      size: 16,
      text: `x: ${normalized.x[index].toPrecision(6)}`,
      position: { x: `${130}px`, y: `${20 + 15 * line}px` },
    },
  });
  line++;

  let peaks = [];
  for (let i = 0; i < normalized.ids.length; i++) {
    peaks.push({
      id: normalized.ids[i],
      meta: normalized.meta[i],
      y: normalized.matrix[i][index],
    });
  }

  if (sortY) {
    peaks = peaks.sort((a, b) => b.y - a.y);
  }
  if (limit) {
    peaks = peaks.slice(0, limit);
  }

  for (let { id, meta, y } of peaks) {
    annotations.push({
      type: 'line',
      position: [
        { x: `${70}px`, y: `${15 + 15 * line}px` },
        { x: `${85}px`, y: `${15 + 15 * line}px` },
      ],
      strokeColor: meta.color,
      strokeWidth: 2,
      label: {
        text: `${y.toPrecision(4)}${showSpectrumID ? ` - ${id}` : ''}`,
        position: { x: `${90}px`, y: `${20 + 15 * line}px` },
      },
    });
    line++;
  }

  return annotations;
}
