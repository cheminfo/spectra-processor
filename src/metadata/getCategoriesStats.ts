export interface CategoryStats {
  [category: string]: {
    classNumber: number;
    counter: number;
  };
}

export interface GetCategoriesStatsOptions {
  /**
   * Property name to use for categorization
   * @default 'category'
   */
  propertyName?: string;
}

/**
 * Get statistics about categories in metadata
 * @param metadata - Array of metadata objects
 * @param options - Options for categorization
 * @returns Object with category statistics
 */
export function getCategoriesStats(
  metadata: Array<Record<string, any>>,
  options: GetCategoriesStatsOptions = {},
): CategoryStats {
  const { propertyName = 'category' } = options;
  const categories: CategoryStats = {};
  let classNumber = 0;
  for (const metadatum of metadata) {
    const value = metadatum[propertyName];
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
