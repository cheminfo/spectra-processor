export function getNormalizationAnnotations(filter = {}, boundary = {}) {
  let { exclusions = [] } = filter;
  let annotations = [];
  exclusions = exclusions.filter((exclusion) => !exclusion.ignore);
  annotations = exclusions.map((exclusion) => {
    let annotation = {
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
