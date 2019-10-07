import { Spectrum } from './spectrum/Spectrum';
import parseJcamp from './parser/jcamp';
import parseText from './parser/text';
import { getNormalizationAnnotations } from './jsgraph/getNormalizationAnnotations';
import { getBoxPlotAnnotations } from './jsgraph/getBoxPlotAnnotations';
import { getChart } from './jsgraph/getChart';
import { getNormalizedChart } from './jsgraph/getNormalizedChart';
import { getScaledChart } from './jsgraph/getScaledChart';
import { getNormalizedData } from './spectra/getNormalizedData';
import { getNormalizedText } from './spectra/getNormalizedText';
import { getScaledData } from './spectra/getScaledData';

export class SpectraProcessor {
  /**
   * Manager a large number of spectra with the possibility to normalize the data
   * and skip the original data.
   * @param {object} [options={}]
   * @param {boolean} [options.maxMemory=64M]
   * @param {object} [options.normalization={}] options to normalize the spectra before comparison
   * @param {number} [options.normalization.from]
   * @param {number} [options.normalization.to]
   * @param {number} [options.normalization.numberOfPoints]
   * @param {array<object>} [options.normalization.filters]
   * @param {string} [options.normalization.filters.X.name]
   * @param {object} [options.normalization.filters.X.options]
   * @param {array<object>} [options.normalization.exclusions]
   * @param {string} [options.normalization.exclusions.X.from]
   * @param {object} [options.normalization.exclusions.X.to]
   */
  constructor(options = {}) {
    this.normalization = options.normalization;
    this.maxMemory = options.maxMemory || 64 * 1024 * 1024;
    this.keepOriginal = true;
    this.spectra = [];
    this.boundaries = {
      minX: Number.MAX_VALUE,
      maxX: Number.MIN_VALUE,
      minY: Number.MAX_VALUE,
      maxY: Number.MIN_VALUE
    };
  }

  getNormalizationAnnotations() {
    return getNormalizationAnnotations(
      this.normalization,
      this.getNormalizedBoundary()
    );
  }

  /**
   * Recalculate the normalized data using the stored original data if available
   * This will throw an error in the original data is not present
   * @param {number} [normalization.from]
   * @param {number} [normalization.to]
   * @param {number} [normalization.numberOfPoints]
   * @param {array<object>} [normalization.filters]
   * @param {string} [normalization.filters.X.name]
   * @param {object} [normalization.filters.X.options]
   * @param {array<object>} [normalization.exclusions]
   * @param {string} [normalization.exclusions.X.from]
   * @param {object} [normalization.exclusions.X.to]
   */
  setNormalization(normalization = {}) {
    if (JSON.stringify(this.normalization) === JSON.stringify(normalization)) {
      return;
    }
    this.normalization = normalization;
    for (let spectrum of this.spectra) {
      spectrum.updateNormalization(this.normalization);
    }
  }

  getNormalization() {
    return this.normalization;
  }

  /**
   * Returns an object contains 4 parameters with the normalized data
   * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[] }
   * @param {object} [options={}]
   * @param {Array} [options.ids] List of spectra ids to export, by default all
   */
  getNormalizedData(options = {}) {
    const { ids } = options;
    let spectra = this.getSpectra(ids);
    return getNormalizedData(spectra);
  }

  /**
   * Returns a tab separated value containing the normalized data
   * @param {object} [options={}]
   * @param {Array} [options.ids] List of spectra ids to export, by default all
   * @param {string} [options.fs='\t'] field separator
   * @param {string} [options.rs='\n'] record (line) separator
   * @returns {string}
   */
  getNormalizedText(options = {}) {
    const { ids } = options;
    let spectra = this.getSpectra(ids);
    return getNormalizedText(spectra, options);
  }

  /**
   * Returns an object contains 4 parameters with the scaled data
   * @param {object} [options={}] scale spectra based on various parameters
   * @param {object} [options.range] from - to
   * @param {Array} [options.ids] ids of selected spectra, by default all
   * @param {string} [options.targetID=spectra[0].id]
   * @param {string} [options.method='max'] min, max, range, minMax
   * @param {boolean} [options.relative=false]
   * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[] }
   */
  getScaledData(options) {
    return getScaledData(this, options);
  }

  /**
   * Add jcamp
   * By default TITLE from the jcamp will be in the meta information
   * @param {string} jcamp
   * @param {object} [options={}]
   * @param {object} [options.meta={}]
   * @param {string} [options.meta.color]
   * @param {object} [options.id={}]
   * @param {boolean} [options.force=false] replace existing spectrum (same ID)
   */

  addFromJcamp(jcamp, options = {}) {
    if (options.force !== true && options.id && this.contains(options.id)) {
      return;
    }
    let parsed = parseJcamp(jcamp);
    let meta = { ...parsed.meta, ...(options.meta || {}) };
    this.addFromData(parsed.data, { meta, id: options.id });
  }

  updateRangesInfo(options) {
    for (let spectrum of this.spectra) {
      spectrum.updateRangesInfo(options);
    }
  }

  /**
   * Add a spectrum based on the data
   * @param {object} data {x, y}}
   * @param {object} [options={}]
   * @param {object} [options.meta={}]
   * @param {object} [options.id]
   * @param {object} [options.normalization={}]
   * @param {object} [options.normalized]
   * @return {Spectrum}
   */

  addFromData(data, options = {}) {
    if (this.spectra.length === 0) this.keepOriginal = true;
    const id = options.id || Math.random(0).toString(36).substring;
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.spectra.length;
    let spectrum = new Spectrum(data.x, data.y, id, {
      meta: options.meta,
      normalized: options.normalized,
      normalization: this.normalization
    });
    // ensure that the normalization is the same for all the spectra
    if (!this.normalization.from) {
      this.normalization.from = spectrum.normalizedBoundary.x.min;
    }
    if (!this.normalization.to) {
      this.normalization.to = spectrum.normalizedBoundary.x.max;
    }
    this.spectra[index] = spectrum;
    if (!this.keepOriginal) {
      spectrum.removeOriginal();
    } else {
      let memoryInfo = this.getMemoryInfo();
      if (memoryInfo.total > this.maxMemory) {
        this.keepOriginal = false;
        this.removeOriginals();
      }
    }
  }

  removeOriginals() {
    for (let spectrum of this.spectra) {
      spectrum.removeOriginal();
    }
  }

  /**
   * Remove the spectrum from the SpectraProcessor for the specified id
   * @param {string} id
   */
  removeSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra.splice(index, 1);
  }

  /**
   * Remove all the spectra not present in the list
   * @param {Array} [ids] Array of ids of the spectra to keep
   */
  removeSpectraNotIn(ids) {
    let currentIDs = this.spectra.map((spectrum) => spectrum.id);
    for (let id of currentIDs) {
      if (!ids.includes(id)) {
        this.removeSpectrum(id);
      }
    }
  }

  /**
   * Checks if the ID of a spectrum exists in the SpectraProcessor
   * @param {string} id
   */
  contains(id) {
    return !isNaN(this.getSpectrumIndex(id));
  }

  /**
   * Returns the index of the spectrum in the spectra array
   * @param {string} id
   * @returns {number}
   */
  getSpectrumIndex(id) {
    if (!id) return undefined;
    for (let i = 0; i < this.spectra.length; i++) {
      let spectrum = this.spectra[i];
      if (spectrum.id === id) return i;
    }
    return undefined;
  }

  /**
   * Returns a spectrum from its ID
   * @param {Array} ids
   * @returns {Array<Spectrum}
   */
  getSpectra(ids) {
    if (!ids || !Array.isArray(ids)) return this.spectra;
    let spectra = [];
    for (let id of ids) {
      let index = this.getSpectrumIndex(id);
      if (index !== undefined) {
        spectra.push(this.spectra[index]);
      }
    }
    return spectra;
  }

  /**
   * Returns the index of the spectrum in the spectra array
   * @param {string} id
   * @returns {number}
   */
  getSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra[index];
  }

  /**
   * Returns a JSGraph chart object for all the spectra
   * @returns {object}
   */
  getChart() {
    return getChart(this.spectra);
  }

  /**
   * Returns a JSGraph annotation object for box plot
   * @returns {object}
   */
  getBoxPlotAnnotations(options) {
    return getBoxPlotAnnotations(this.spectra, options);
  }

  /**
   * Returns a JSGraph chart object for all the normalized spectra
   * @param {object} [options={}]
   * @param {Array} [options.ids] ids of the spectra to select, by default all
   * @returns {object}
   */
  getNormalizedChart(options) {
    return getNormalizedChart(this.spectra, options);
  }

  /**
   * Returns a JSGraph chart object for all the scaled normalized spectra
   * @param {object} [options={}]
   * @param {Array} [options.ids] ids of the spectra to select, by default all
   * @param {object} [options.range] from - to
   * @param {string} [options.targetID=spectra[0].id]
   * @param {string} [options.method='max'] min, max, range, minMax
   * @param {boolean} [options.relative=false]
   * @returns {object}
   */
  getScaledChart(options) {
    return getScaledChart(this, options);
  }

  getMemoryInfo() {
    let memoryInfo = { original: 0, normalized: 0, total: 0 };
    this.spectra.forEach((spectrum) => {
      let memory = spectrum.memory;
      memoryInfo.original += memory.original;
      memoryInfo.normalized += memory.normalized;
      memoryInfo.total += memory.total;
    });
    memoryInfo.keepOriginal = this.keepOriginal;
    memoryInfo.maxMemory = this.maxMemory;
    return memoryInfo;
  }

  getNormalizedBoundary() {
    let boundary = {
      x: { min: Number.MAX_VALUE, max: Number.MIN_VALUE },
      y: { min: Number.MAX_VALUE, max: Number.MIN_VALUE }
    };
    for (let spectrum of this.spectra) {
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
   * Create SpectraProcessor from normalized TSV
   * @param {string} text
   * @param {object} [options={}]
   * @param {object} [options.separator='\t']
   */
  static fromNormalizedText(text, options = {}) {
    let parsed = parseText(text, options);
    if (!parsed) {
      throw new Error('Can not parse TSV file');
    }
    let spectraProcessor = new SpectraProcessor();

    spectraProcessor.setNormalization({
      from: parsed.x[0],
      to: parsed.x[parsed.x.length - 1],
      numberOfPoints: parsed.x.length
    });
    spectraProcessor.keepOriginal = false;

    for (let i = 0; i < parsed.ids.length; i++) {
      spectraProcessor.addFromData(
        { x: [], y: [] },
        {
          normalized: {
            x: parsed.x,
            y: parsed.matrix[i]
          },
          id: parsed.ids[i],
          meta: parsed.meta[i]
        }
      );
    }

    return spectraProcessor;
  }
}
