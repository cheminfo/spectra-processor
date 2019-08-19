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
   * It is important to set correctly the options directly because changes
   * will not be possible if the keepOriginalData is not true
   * @param {object} [options={}]
   * @param {boolean} [options.keepOriginalData=False]
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
   * @param {object} [options.scale={}] scale spectra based on various parameters
   * @param {string} [options.scale.range=]
   * @param {string} [options.scale.targetID=spectra[0].id]
   * @param {string} [options.scale.relative=false]
   * @param {string} [options.scale.method='max'] min, max, range, minMax
   */
  constructor(options = {}) {
    this.options = options;
    this.spectra = [];
  }

  getNormalizationAnnotations() {
    return getNormalizationAnnotations(this.options.normalization);
  }

  /**
   *
   */
  setRescale(scale) {
    this.options.scale = scale;
  }

  setNormalization(normalization = {}) {
    checkOriginal(this, 'Can not change normalization filter.');
    this.options.normalization = normalization;
    for (let spectrum of this.spectra) {
      spectrum.updateNormalization(this.options.normalization);
    }
  }

  getNormalizedData() {
    return getNormalizedData(this.spectra);
  }

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
    const id = options.id || Math.random(0).toString(36).substring;
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.spectra.length;
    let spectrum = new Spectrum(data.x, data.y, id, {
      meta: options.meta,
      keepOriginalData: this.options.keepOriginalData,
      normalization: this.options.normalization
    });
    this.spectra[index] = spectrum;
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
      console.log({ index });
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
    checkOriginal(this, 'Can not getChart but you may try getNormalizedChart.');
    return getChart(this.spectra);
  }

  getNormalizedChart(options) {
    return getNormalizedChart(this.spectra, options);
  }

  getScaledChart(options) {
    return getScaledChart(this, options);
  }
}

export function checkOriginal(spectraProcessor, message) {
  if (
    !spectraProcessor.options.keepOriginalData &&
    spectraProcessor.spectra.length > 0
  ) {
    throw new Error(
      `${message} Missing original data. Use the option keepOriginalData=true.`
    );
  }
}
