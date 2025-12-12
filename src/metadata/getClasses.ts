import type { CategoryStats } from './getCategoriesStats.js';
import { getCategoriesStats } from './getCategoriesStats.js';

export interface GetClassesOptions {
  /**
   * Property name to use for classification
   * @default 'category'
   */
  propertyName?: string;
}

/**
 * Get class numbers for each metadata entry
 * @param metadata - Array of metadata objects
 * @param options - Options for classification
 * @returns Array of class numbers
 */
export function getClasses(
  metadata: Array<Record<string, any>>,
  options: GetClassesOptions = {},
): number[] {
  const { propertyName = 'category' } = options;
  const categoriesStats: CategoryStats = getCategoriesStats(metadata, options);
  const result = new Array<number>(metadata.length);
  for (let i = 0; i < metadata.length; i++) {
    result[i] = categoriesStats[metadata[i][propertyName]].classNumber;
  }
  return result;
}
