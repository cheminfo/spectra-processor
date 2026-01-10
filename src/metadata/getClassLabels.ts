export interface GetClassLabelsOptions {
  /**
   * Property name to use for labels
   * @default 'category'
   */
  propertyName?: string;
}

/**
 * Get class labels for each metadata entry
 * @param metadata - Array of metadata objects
 * @param options - Options for label extraction
 * @returns Array of class labels
 */
export function getClassLabels(
  metadata: Array<Record<string, any>>,
  options: GetClassLabelsOptions = {},
): any[] {
  const { propertyName = 'category' } = options;
  const categories: any[] = [];
  for (const metadatum of metadata) {
    categories.push(metadatum[propertyName]);
  }
  return categories;
}
