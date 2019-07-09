import { Spectrum } from './spectrum/Spectrum';
import parseJcamp from './parser/jcamp';

export class SpectraProcessor {
  constructor(options = {}) {
    this.keepOriginalData =
      options.keepOriginalData === undefined ? false : options.keepOriginalData;
    this.normalizationFilter = undefined;
    this.spectra = [];
  }

  setNormalizationFilter(normalizationFilter = {}) {
    if (!this.keepOriginalData && this.spectra.length > 0) {
      throw new Error(
        'Can not change normalization filter, missing original data'
      );
    }
    this.normalizationFilter = normalizationFilter;
    for (let spectrum of this.spectra) {
      spectrum.updateNormalized(this.normalizationFilter);
    }
  }

  /**
   * Add jcamp
   * @param {string} jcamp
   * @param {string} id
   * @param {boolean} [force=false]
   * @param {object} [meta={}]
   * @param {string} [meta.color]
   */
  addFromJcamp(jcamp, id, meta = {}, force = false) {
    if (force === false && this.contains(id)) {
      debug('log', `Existing: ${id}`);
      return;
    }

    let parsed = parseJcamp(jcamp);
    this.createAndAddSpectrum(parsed, id, meta);
  }

  /**
   * Add a spectrum
   * @param {Spectrum} spectrum
   */
  createAndAddSpectrum(parsed, id, meta) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.spectra.length;
    let spectrum = new Spectrum(parsed.data.x, parsed.data.y, id, {
      meta
    });
    spectrum.updateNormalized(this.normalizationFilter);
    this.spectra[index] = spectrum;
  }

  removeSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.data.splice(index, 1);
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

  getNormalizedData() {
    if (!this.spectra || !this.spectra[0]) return {};
    let matrix = [];
    let meta = [];
    let ids = [];
    for (let spectrum of this.spectra) {
      ids.push(spectrum.id);
      matrix.push(spectrum.normalized.y);
      meta.push(spectrum.meta);
    }
    let x = this.spectra[0].normalized.x;
    return { ids, matrix, meta, x };
  }

  getChart(options = {}) {
    const { ids, filter = {}, mode = this.mode } = options;
    let chart = {
      data: []
    };
    for (let spectrum of this.spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        let data = spectrum.getData({ mode, filter });
        data.styles = {
          unselected: {
            lineColor: spectrum.meta.color || 'darkgrey',
            lineWidth: 1,
            lineStyle: 1
          },
          selected: {
            lineColor: spectrum.meta.color || 'darkgrey',
            lineWidth: 3,
            lineStyle: 1
          }
        };
        data.label = spectrum.meta.id || spectrum.id;
        chart.data.push(data);
      }
    }
    return chart;
  }
}
