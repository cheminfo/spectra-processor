import { getNormalizedData } from '../spectra/getNormalizedData';

export function getTrackAnnotation(spectra, index, options = {}) {
  const { ids } = options;
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

  for (let i = 0; i < normalized.ids.length; i++) {
    let id = normalized.ids[i];
    let meta = normalized.meta[i];
    let y = normalized.matrix[i][index];
    annotations.push({
      type: 'line',
      position: [
        { x: `${70}px`, y: `${15 + 15 * line}px` },
        { x: `${85}px`, y: `${15 + 15 * line}px` },
      ],
      strokeColor: meta.color,
      strokeWidth: 2,
      label: {
        text: `${y.toPrecision(4)} - ${id}`,
        position: { x: `${90}px`, y: `${20 + 15 * line}px` },
      },
    });
    line++;
  }

  return annotations;
}
