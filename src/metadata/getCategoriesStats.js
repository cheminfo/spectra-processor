/**
 * @private
 * @param {Array<object>} [metadata]
 * @param {object} [options={}] scale spectra based on various parameters
 * @param {string} [options.propertyName="category"]
 */

export function getCategoriesStats(metadata, options = {}) {
  const { propertyName = 'category' } = options;
  let categories = {};
  let classNumber = 0;
  for (let metadatum of metadata) {
    let value = metadatum[propertyName];
    if (!categories[value]) {
      categories[value] = {
        classNumber: classNumber++,
        counter: 0,
      };
    }
    categories[value].counter++;
  }
  return categories;
}
