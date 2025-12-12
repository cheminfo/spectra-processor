import { getNormalizedData } from '../spectra/getNormalizedData.js';
import type { Spectrum } from '../spectrum/Spectrum.js';

export interface AnnotationPosition {
  x: number | string;
  y: number | string;
}

export interface LineAnnotation {
  type: string;
  position: AnnotationPosition[];
  strokeWidth?: number;
  strokeColor?: string;
  label?: {
    size?: number;
    text: string;
    position: AnnotationPosition;
  };
}

export interface GetTrackAnnotationOptions {
  /**
   * IDs of the spectra to select
   */
  ids?: unknown[];
  /**
   * Show spectrum ID in annotations
   * @default true
   */
  showSpectrumID?: boolean;
  /**
   * Sort annotations by Y value
   * @default true
   */
  sortY?: boolean;
  /**
   * Maximum number of annotations to show
   * @default 20
   */
  limit?: number;
}

/**
 * Get track annotation for a specific index
 * @param spectra - Array of spectrum objects
 * @param index - Index in the spectrum
 * @param options - Annotation options
 * @returns Array of line annotations
 */
export function getTrackAnnotation(
  spectra: Spectrum[],
  index: number,
  options: GetTrackAnnotationOptions = {},
): LineAnnotation[] {
  const { ids, showSpectrumID = true, sortY = true, limit = 20 } = options;
  const annotations: LineAnnotation[] = [];

  const normalized = getNormalizedData(spectra, { ids });

  if (normalized.ids.length === 0) return annotations;
  let line = 0;

  // Header containing X coordinate
  annotations.push({
    type: 'line',
    position: [
      { x: `70px`, y: `${15 + 15 * line}px` },
      { x: `85px`, y: `${15 + 15 * line}px` },
    ],
    strokeWidth: 0.0000001,
    label: {
      size: 16,
      text: `x: ${normalized.x[index].toPrecision(6)}`,
      position: { x: `130px`, y: `${20 + 15 * line}px` },
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
    peaks.sort((a, b) => b.y - a.y);
  }
  if (limit) {
    peaks = peaks.slice(0, limit);
  }

  for (const { id, meta, y } of peaks) {
    annotations.push({
      type: 'line',
      position: [
        { x: `70px`, y: `${15 + 15 * line}px` },
        { x: `85px`, y: `${15 + 15 * line}px` },
      ],
      strokeColor: meta.color,
      strokeWidth: 2,
      label: {
        text: `${y.toPrecision(4)}${showSpectrumID ? ` - ${id}` : ''}`,
        position: { x: `90px`, y: `${20 + 15 * line}px` },
      },
    });
    line++;
  }

  return annotations;
}
