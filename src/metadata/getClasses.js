import { getCategoriesStats } from './getCategoriesStats.js';

/**
 * @private
 * @param {Array<object>} [metadata]
 * @param {object} [options={}] - scale spectra based on various parameters
 * @param {string} [options.propertyName="category"]
 */

export function getClasses(metadata, options = {}) {
  const { propertyName = 'category' } = options;
  const categoriesStats = getCategoriesStats(metadata, options);
  const result = new Array(metadata.length);
  for (let i = 0; i < metadata.length; i++) {
    result[i] = categoriesStats[metadata[i][propertyName]].classNumber;
  }
  return result;
}
