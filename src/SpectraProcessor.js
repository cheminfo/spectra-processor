import { Spectrum } from './spectrum/Spectrum';
import parseJcamp from './parser/jcamp';
import { getNormalizationAnnotations } from './jsgraph/getNormalizationAnnotations';
import { getChart } from './jsgraph/getChart';
import { getNormalizedChart } from './jsgraph/getNormalizedChart';
import { getScaledChart } from './jsgraph/getScaledChart';
import { getNormalizedData } from './spectra/getNormalizedData';
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
  }

  getNormalizationAnnotations() {
    return getNormalizationAnnotations(this.normalization);
  }

  setNormalization(normalization = {}) {
    this.normalization = normalization;
    for (let spectrum of this.spectra) {
      spectrum.updateNormalization(this.normalization);
    }
  }

  getNormalizedData() {
    return getNormalizedData(this.spectra);
  }

  /**
   *
   * @param {*} [options={}]
   * @param {object} [scale={}] scale spectra based on various parameters
   * @param {string} [scale.range=]
   * @param {string} [scale.targetID=spectra[0].id]
   * @param {string} [scale.relative=false]
   * @param {string} [scale.method='max'] min, max, range, minMax
   */
  getScaledData(options) {
    return getScaledData(this, options);
  }

  /**
   * Add jcamp
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
    this.addFromData(parsed.data, options);
  }

  updateRangesInfo(options) {
    for (let spectrum of this.spectra) {
      spectrum.updateRangesInfo(options);
    }
  }

  /**
   *
   * @param {object} parsed
   * @param {object} [options={}]
   * @param {object} [options.meta={}]
   * @return {Spectrum}
   */

  addFromData(data, options = {}) {
    if (this.spectra.length === 0) this.keepOriginal = true;
    const id = options.id || Math.random(0).toString(36).substring;
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.spectra.length;
    let spectrum = new Spectrum(data.x, data.y, id, {
      meta: options.meta,
      normalization: this.normalization
    });
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

  removeSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra.splice(index, 1);
  }

  removeSpectraNotIn(ids) {
    let currentIDs = this.spectra.map((spectrum) => spectrum.id);
    for (let id of currentIDs) {
      if (!ids.includes(id)) {
        this.removeSpectrum(id);
      }
    }
  }

  contains(id) {
    return !isNaN(this.getSpectrumIndex(id));
  }

  getSpectrumIndex(id) {
    if (!id) return undefined;
    for (let i = 0; i < this.spectra.length; i++) {
      let spectrum = this.spectra[i];
      if (spectrum.id === id) return i;
    }
    return undefined;
  }

  getSpectra(ids) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) return this.spectra;
    let spectra = [];
    for (let id of ids) {
      let index = this.getSpectrumIndex(id);
      if (index !== undefined) {
        spectra.push(this.spectra[index]);
      }
    }
    return spectra;
  }

  getSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra[index];
  }

  getChart() {
    return getChart(this.spectra);
  }

  getNormalizedChart(options) {
    return getNormalizedChart(this.spectra, options);
  }

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
}
