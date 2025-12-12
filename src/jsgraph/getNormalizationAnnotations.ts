export interface Exclusion {
  from: number;
  to: number;
  ignore?: boolean;
}

export interface NormalizationFilter {
  from?: number;
  to?: number;
  exclusions?: Exclusion[];
}

export interface RectAnnotation {
  type: string;
  position: Array<{ x: number | string; y: string }>;
  strokeWidth: number;
  fillColor: string;
}

/**
 * Get normalization annotations for a filter
 * @param filter - Normalization filter with from, to, and exclusions
 * @returns Array of rectangle annotations
 */
export function getNormalizationAnnotations(
  filter: NormalizationFilter = {},
): RectAnnotation[] {
  let { exclusions = [] } = filter;
  let annotations: RectAnnotation[] = [];
  exclusions = exclusions.filter((exclusion) => !exclusion.ignore);
  annotations = exclusions.map((exclusion) => {
    const annotation: RectAnnotation = {
      type: 'rect',
      position: [
        { x: exclusion.from, y: '0px' },
        { x: exclusion.to, y: '2000px' },
      ],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)',
    };
    return annotation;
  });
  if (filter.from !== undefined) {
    annotations.push({
      type: 'rect',
      position: [
        { x: Number.MIN_SAFE_INTEGER, y: '0px' },
        { x: filter.from, y: '2000px' },
      ],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)',
    });
  }
  if (filter.to !== undefined) {
    annotations.push({
      type: 'rect',
      position: [
        { x: filter.to, y: '0px' },
        { x: Number.MAX_SAFE_INTEGER, y: '2000px' },
      ],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)',
    });
  }
  return annotations;
}
