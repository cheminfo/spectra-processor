import type { DataXY } from 'cheminfo-types';
import { xFindClosestIndex } from 'ml-spectra-processing';

import type { GetAutocorrelationChartOptions } from './jsgraph/getAutocorrelationChart.js';
import { getAutocorrelationChart } from './jsgraph/getAutocorrelationChart.js';
import type { GetBoxPlotChartOptions } from './jsgraph/getBoxPlotChart.js';
import { getBoxPlotChart } from './jsgraph/getBoxPlotChart.js';
import type { GetChartOptions } from './jsgraph/getChart.js';
import { getChart } from './jsgraph/getChart.js';
import type { NormalizationFilter } from './jsgraph/getNormalizationAnnotations.js';
import { getNormalizationAnnotations } from './jsgraph/getNormalizationAnnotations.js';
import type { GetNormalizedChartOptions } from './jsgraph/getNormalizedChart.js';
import { getNormalizedChart } from './jsgraph/getNormalizedChart.js';
import { getPostProcessedChart } from './jsgraph/getPostProcessedChart.js';
import type { GetTrackAnnotationOptions } from './jsgraph/getTrackAnnotation.js';
import { getTrackAnnotation } from './jsgraph/getTrackAnnotation.js';
import type { GetCategoriesStatsOptions } from './metadata/getCategoriesStats.js';
import { getCategoriesStats } from './metadata/getCategoriesStats.js';
import type { GetClassLabelsOptions } from './metadata/getClassLabels.js';
import { getClassLabels } from './metadata/getClassLabels.js';
import type { GetClassesOptions } from './metadata/getClasses.js';
import { getClasses } from './metadata/getClasses.js';
import type { GetMetadataOptions } from './metadata/getMetadata.js';
import { getMetadata } from './metadata/getMetadata.js';
import parseJcamp from './parser/parseJcamp.js';
import parseMatrix from './parser/parseMatrix.js';
import type { ParseTextOptions } from './parser/parseText.js';
import parseText from './parser/parseText.js';
import type { AutocorrelationResult } from './spectra/getAutocorrelation.js';
import { getAutocorrelation } from './spectra/getAutocorrelation.js';
import { getBoxPlotData } from './spectra/getBoxPlotData.js';
import type { MeanData } from './spectra/getMeanData.js';
import { getMeanData } from './spectra/getMeanData.js';
import type { GetNormalizedDataOptions } from './spectra/getNormalizedData.js';
import { getNormalizedData } from './spectra/getNormalizedData.js';
import type { GetNormalizedTextOptions } from './spectra/getNormalizedText.js';
import { getNormalizedText } from './spectra/getNormalizedText.js';
import type { GetPostProcessedDataOptions } from './spectra/getPostProcessedData.js';
import { getPostProcessedData } from './spectra/getPostProcessedData.js';
import type { GetPostProcessedTextOptions } from './spectra/getPostProcessedText.js';
import { getPostProcessedText } from './spectra/getPostProcessedText.js';
import type { AxisBoundary, MemoryStats, SpectrumOptions } from './spectrum/Spectrum.js';
import { Spectrum } from './spectrum/Spectrum.js';

export interface NormalizationOptions extends NormalizationFilter {
  numberOfPoints?: number;
  applyRangeSelectionFirst?: boolean;
  filters?: Array<{ name: string; options?: any }>;
}

export interface SpectraProcessorOptions {
  /**
   * Maximum memory to use for storing original data
   * @default 256 * 1024 * 1024 (256MB)
   */
  maxMemory?: number;
  /**
   * Options to normalize the spectra before comparison
   */
  normalization?: NormalizationOptions;
}

export interface AddFromDataOptions {
  /**
   * Metadata for the spectrum
   */
  meta?: Record<string, any>;
  /**
   * Spectrum identifier
   */
  id?: string;
  /**
   * Normalization options
   */
  normalization?: NormalizationOptions;
  /**
   * Pre-normalized data
   */
  normalized?: DataXY;
}

export interface AddFromTextOptions extends ParseTextOptions {
  /**
   * Metadata for the spectrum
   */
  meta?: Record<string, any>;
  /**
   * Spectrum identifier
   */
  id?: string;
  /**
   * Replace existing spectrum with same ID
   * @default false
   */
  force?: boolean;
}

export interface AddFromJcampOptions {
  /**
   * Metadata for the spectrum
   */
  meta?: Record<string, any>;
  /**
   * Spectrum identifier
   */
  id?: string;
  /**
   * Replace existing spectrum with same ID
   * @default false
   */
  force?: boolean;
}

export interface GetAutocorrelationOptions extends GetNormalizedDataOptions {
  /**
   * X value if index is undefined
   */
  x?: number;
}

export interface MinMaxX {
  min: number;
  max: number;
}

/**
 * Manager for a large number of spectra with the possibility to normalize the data
 * and skip the original data.
 */
export class SpectraProcessor {
  normalization?: NormalizationOptions;
  maxMemory: number;
  keepOriginal: boolean;
  spectra: Spectrum[];

  /**
   * Create a SpectraProcessor
   * @param options - Configuration options
   */
  constructor(options: SpectraProcessorOptions = {}) {
    this.normalization = options.normalization;
    this.maxMemory = options.maxMemory || 256 * 1024 * 1024;
    this.keepOriginal = true;
    this.spectra = [];
  }

  getNormalizationAnnotations() {
    return getNormalizationAnnotations(this.normalization);
  }

  /**
   * Recalculate the normalized data using the stored original data if available
   * This will throw an error if the original data is not present
   * @param normalization - Normalization options
   */
  setNormalization(normalization: NormalizationOptions = {}): void {
    if (JSON.stringify(this.normalization) === JSON.stringify(normalization)) {
      return;
    }
    this.normalization = normalization;
    for (const spectrum of this.spectra) {
      spectrum.updateNormalization(this.normalization);
    }
  }

  getNormalization(): NormalizationOptions | undefined {
    return this.normalization;
  }

  /**
   * Returns an object {x:[], y:[]} containing the autocorrelation for the
   * specified index
   * @param index - X index of the spectrum to autocorrelate
   * @param options - Options for autocorrelation
   * @returns Autocorrelation result
   */
  getAutocorrelation(
    index: number | undefined,
    options: GetAutocorrelationOptions = {},
  ): AutocorrelationResult {
    const { x } = options;
    const normalizedData = this.getNormalizedData(options);

    let actualIndex = index;
    if (actualIndex === undefined && x !== undefined) {
      actualIndex = xFindClosestIndex(normalizedData.x, x);
    }

    return getAutocorrelation(normalizedData, actualIndex!);
  }

  /**
   * Returns a {x:[], y:[]} containing the average of specified spectra
   * @param options - Options for mean calculation
   * @returns Mean data
   */
  getMeanData(options?: GetNormalizedDataOptions): MeanData {
    return getMeanData(this.getNormalizedData(options));
  }

  /**
   * Returns an object containing 4 parameters with the normalized data
   * @param options - Options for normalization
   * @returns { ids:[], matrix:[Array], meta:[object], x:[] }
   */
  getNormalizedData(options: GetNormalizedDataOptions = {}) {
    const { ids } = options;
    const spectra = this.getSpectra(ids);
    return getNormalizedData(spectra);
  }

  /**
   * Returns a tab separated value containing the normalized data
   * @param options - Options for export
   * @returns Text string
   */
  getNormalizedText(options: GetNormalizedTextOptions = {}): string {
    const { ids } = options;
    const spectra = this.getSpectra(ids);
    return getNormalizedText(spectra, options);
  }

  /**
   * Returns a tab separated value containing the post processed data
   * @param options - Options for export
   * @returns Text string
   */
  getPostProcessedText(options: GetPostProcessedTextOptions = {}): string {
    return getPostProcessedText(this, options);
  }

  getMinMaxX(): MinMaxX {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (const spectrum of this.spectra) {
      if (spectrum.minX < min) min = spectrum.minX;
      if (spectrum.maxX > max) max = spectrum.maxX;
    }
    return { min, max };
  }

  /**
   * Returns an object containing 4 parameters with the scaled data
   * @param options - Options for post-processing
   * @returns { ids:[], matrix:[Array], meta:[object], x:[] }
   */
  getPostProcessedData(options?: GetPostProcessedDataOptions) {
    return getPostProcessedData(this, options);
  }

  /**
   * Add from text
   * By default TITLE from the jcamp will be in the meta information
   * @param text - Text data
   * @param options - Options for parsing
   */
  addFromText(text: string, options: AddFromTextOptions = {}): void {
    if (options.force !== true && options.id && this.contains(options.id)) {
      return;
    }
    const parsed = parseText(text, options);
    const meta = { ...parsed.data.meta, ...options.meta };
    this.addFromData(parsed.data, { meta, id: options.id });
  }

  /**
   * Add jcamp
   * By default TITLE from the jcamp will be in the meta information
   * @param jcamp - JCAMP data
   * @param options - Options for parsing
   */
  addFromJcamp(jcamp: string, options: AddFromJcampOptions = {}): void {
    if (options.force !== true && options.id && this.contains(options.id)) {
      return;
    }
    const parsed = parseJcamp(jcamp);
    const meta = { ...parsed.info, ...parsed.meta, ...options.meta };
    this.addFromData(parsed.data, { meta, id: options.id });
  }

  updateRangesInfo(options?: any): void {
    for (const spectrum of this.spectra) {
      spectrum.updateRangesInfo(options);
    }
  }

  /**
   * Returns the metadata for a set of spectra
   * @param options - Options for metadata extraction
   * @returns Metadata array
   */
  getMetadata(options: GetMetadataOptions = {}) {
    const { ids } = options;
    return getMetadata(this.getSpectra(ids));
  }

  /**
   * Get classes from metadata
   * @param options - Options for classification
   * @returns Array of class numbers
   */
  getClasses(options?: GetClassesOptions) {
    return getClasses(this.getMetadata(options), options);
  }

  /**
   * Get class labels from metadata
   * @param options - Options for label extraction
   * @returns Array of class labels
   */
  getClassLabels(options?: GetClassLabelsOptions) {
    return getClassLabels(this.getMetadata(options), options);
  }

  /**
   * Get categories statistics
   * @param options - Options for statistics
   * @returns Category statistics
   */
  getCategoriesStats(options?: GetCategoriesStatsOptions) {
    return getCategoriesStats(this.getMetadata(), options);
  }

  /**
   * Add a spectrum based on the data
   * @param data - {x, y}
   * @param options - Options for adding spectrum
   * @returns Spectrum
   */
  addFromData(data: DataXY, options: AddFromDataOptions = {}): void {
    if (this.spectra.length === 0) this.keepOriginal = true;
    const id = options.id || Math.random().toString(36).slice(2, 10);
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.spectra.length;
    const spectrum = new Spectrum(data.x, data.y, id, {
      meta: options.meta,
      normalized: options.normalized,
      normalization: this.normalization,
    });
    this.spectra[index] = spectrum;
    if (!this.keepOriginal) {
      spectrum.removeOriginal();
    } else {
      const memoryInfo = this.getMemoryInfo();
      if (memoryInfo.total > this.maxMemory) {
        this.keepOriginal = false;
        this.removeOriginals();
      }
    }
  }

  removeOriginals(): void {
    for (const spectrum of this.spectra) {
      spectrum.removeOriginal();
    }
  }

  /**
   * Remove the spectrum from the SpectraProcessor for the specified id
   * @param id - Spectrum identifier
   * @returns Removed spectrum array
   */
  removeSpectrum(id: string): Spectrum[] | undefined {
    const index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra.splice(index, 1);
  }

  /**
   * Remove all the spectra not present in the list
   * @param ids - Array of ids of the spectra to keep
   */
  removeSpectraNotIn(ids: unknown[]): void {
    const currentIDs = this.spectra.map((spectrum) => spectrum.id);
    for (const id of currentIDs) {
      if (!ids.includes(id)) {
        this.removeSpectrum(id);
      }
    }
  }

  /**
   * Checks if the ID of a spectrum exists in the SpectraProcessor
   * @param id - Spectrum identifier
   * @returns True if spectrum exists
   */
  contains(id: string): boolean {
    return this.getSpectrumIndex(id) !== undefined;
  }

  /**
   * Returns the index of the spectrum in the spectra array
   * @param id - Spectrum identifier
   * @returns Index or undefined
   */
  getSpectrumIndex(id: string | undefined): number | undefined {
    if (!id) return undefined;
    for (let i = 0; i < this.spectra.length; i++) {
      const spectrum = this.spectra[i];
      if (spectrum.id === id) return i;
    }
    return undefined;
  }

  /**
   * Returns an array of all the ids
   * @returns Array of IDs
   */
  getIDs(): string[] {
    return this.spectra.map((spectrum) => spectrum.id);
  }

  /**
   * Returns an array of spectrum from their ids
   * @param ids - Array of spectrum IDs
   * @returns Array of Spectrum
   */
  getSpectra(ids?: unknown[]): Spectrum[] {
    if (!ids || !Array.isArray(ids)) return this.spectra;
    const spectra: Spectrum[] = [];
    for (const id of ids) {
      const index = this.getSpectrumIndex(id as string);
      if (index !== undefined) {
        spectra.push(this.spectra[index]);
      }
    }
    return spectra;
  }

  /**
   * Returns the spectrum for the given id
   * @param id - Spectrum identifier
   * @returns Spectrum or undefined
   */
  getSpectrum(id: string): Spectrum | undefined {
    const index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra[index];
  }

  /**
   * Returns a JSGraph chart object for all the spectra
   * @param options - Chart options
   * @returns Chart object
   */
  getChart(options?: GetChartOptions) {
    return getChart(this.spectra, options);
  }

  /**
   * Returns a JSGraph chart object for autocorrelation
   * @param index - Index in spectrum
   * @param options - Chart options
   * @returns Chart object
   */
  getAutocorrelationChart(
    index: number,
    options?: GetAutocorrelationChartOptions,
  ) {
    return getAutocorrelationChart(this, index, options);
  }

  /**
   * Returns a JSGraph annotation object for the specified index
   * @param index - Index in spectrum
   * @param options - Annotation options
   * @returns Annotation object
   */
  getTrackAnnotation(index: number, options?: GetTrackAnnotationOptions) {
    return getTrackAnnotation(this.spectra, index, options);
  }

  /**
   * Returns a JSGraph annotation object for box plot
   * @param options - Chart options
   * @returns Chart object
   */
  getBoxPlotChart(options: GetBoxPlotChartOptions = {}) {
    const normalizedData = this.getNormalizedData(options);
    return getBoxPlotChart(normalizedData, options);
  }

  /**
   * Returns boxplot information
   * @param options - Options for box plot
   * @returns Box plot data
   */
  getBoxPlotData(options: GetNormalizedDataOptions = {}) {
    const normalizedData = this.getNormalizedData(options);
    return getBoxPlotData(normalizedData);
  }

  /**
   * Returns a JSGraph chart object for all the normalized spectra
   * @param options - Chart options
   * @returns Chart object
   */
  getNormalizedChart(options: GetNormalizedChartOptions = {}) {
    const { ids, ...chartOptions } = options;
    const spectra = this.getSpectra(ids);
    return getNormalizedChart(spectra, chartOptions);
  }

  /**
   * Returns a JSGraph chart object for all the scaled normalized spectra
   * @param options - Options for post-processing
   * @returns Chart object
   */
  getPostProcessedChart(options?: GetPostProcessedDataOptions) {
    return getPostProcessedChart(this, options);
  }

  getMemoryInfo(): MemoryStats & { keepOriginal: boolean; maxMemory: number } {
    const memoryInfo: MemoryStats = { original: 0, normalized: 0, total: 0 };
    for (const spectrum of this.spectra) {
      const memory = spectrum.memory;
      memoryInfo.original += memory.original;
      memoryInfo.normalized += memory.normalized;
      memoryInfo.total += memory.total;
    }
    return {
      ...memoryInfo,
      keepOriginal: this.keepOriginal,
      maxMemory: this.maxMemory,
    };
  }

  getNormalizedBoundary(): AxisBoundary {
    const boundary: AxisBoundary = {
      x: { min: Number.MAX_VALUE, max: Number.MIN_VALUE },
      y: { min: Number.MAX_VALUE, max: Number.MIN_VALUE },
    };
    for (const spectrum of this.spectra) {
      if (spectrum.normalizedBoundary.x.min < boundary.x.min) {
        boundary.x.min = spectrum.normalizedBoundary.x.min;
      }
      if (spectrum.normalizedBoundary.x.max > boundary.x.max) {
        boundary.x.max = spectrum.normalizedBoundary.x.max;
      }
      if (spectrum.normalizedBoundary.y.min < boundary.y.min) {
        boundary.y.min = spectrum.normalizedBoundary.y.min;
      }
      if (spectrum.normalizedBoundary.y.max > boundary.y.max) {
        boundary.y.max = spectrum.normalizedBoundary.y.max;
      }
    }
    return boundary;
  }

  /**
   * We provide the allowed from / to after normalization
   * For the X axis we return the smallest common values
   * For the Y axis we return the largest min / max
   */
  getNormalizedCommonBoundary(): AxisBoundary {
    const boundary: AxisBoundary = {
      x: { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY },
      y: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
    };
    for (const spectrum of this.spectra) {
      if (spectrum.normalizedAllowedBoundary.x.min > boundary.x.min) {
        boundary.x.min = spectrum.normalizedAllowedBoundary.x.min;
      }
      if (spectrum.normalizedAllowedBoundary.x.max < boundary.x.max) {
        boundary.x.max = spectrum.normalizedAllowedBoundary.x.max;
      }
      if (spectrum.normalizedAllowedBoundary.y.min < boundary.y.min) {
        boundary.y.min = spectrum.normalizedAllowedBoundary.y.min;
      }
      if (spectrum.normalizedAllowedBoundary.y.max > boundary.y.max) {
        boundary.y.max = spectrum.normalizedAllowedBoundary.y.max;
      }
    }
    return boundary;
  }

  /**
   * Create SpectraProcessor from normalized TSV
   * @param text - TSV text
   * @param options - Parsing options
   * @returns SpectraProcessor instance
   */
  static fromNormalizedMatrix(
    text: string,
    options: { separator?: string } = {},
  ): SpectraProcessor {
    const parsed = parseMatrix(text, options);
    if (!parsed) {
      throw new Error('Can not parse TSV file');
    }
    const spectraProcessor = new SpectraProcessor();

    spectraProcessor.setNormalization({
      from: parsed.x[0],
      to: parsed.x.at(-1),
      numberOfPoints: parsed.x.length,
    });

    for (let i = 0; i < parsed.ids.length; i++) {
      spectraProcessor.addFromData(
        { x: [], y: [] },
        {
          normalized: {
            x: parsed.x,
            y: parsed.matrix[i],
          },
          id: parsed.ids[i],
          meta: parsed.meta[i],
        },
      );
    }

    spectraProcessor.keepOriginal = false;

    return spectraProcessor;
  }
}
