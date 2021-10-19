/**
 * @private
 * @param {Array<object>} [metadata]
 * @param {object} [options={}] scale spectra based on various parameters
 * @param {string} [options.propertyName="category"]
 */

export function getClassLabels(metadata, options = {}) {
  const { propertyName = 'category' } = options;
  const categories = [];
  for (const metadatum of metadata) {
    categories.push(metadatum[propertyName]);
  }
  return categories;
}
