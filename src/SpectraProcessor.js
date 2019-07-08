import { fromJcamp } from './index.js';

export class SpectraProcessor {
  constructor(options = {}) {
    this.originalDataFilter = undefined;
    this.dataFilter = {};
    this.spectra = [];
    this.debug = (kind, value) => {
      switch (kind) {
        case 'log':
          console.log(value);
          break;
        case 'warn':
          console.warn(value);
          break;
        case 'error':
          console.error(value);
          break;
        default:
          console.error(value);
      }
    };
  }

  setDataFilter(filter) {
    if (this.originalDataFilter) {
      this.debug(
        'error',
        'Can not change data filter, no original data available'
      );
      return;
    }
    this.dataFilter = filter;
    for (let spectrum of this.spectra) {
      spectrum.normalized = undefined;
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
    let spectrum = Spectrum.fromJcamp(jcamp);
    this.addSpectrum(spectrum, id, meta);
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
    for (let i = 0; i < this.data.length; i++) {
      let spectrum = this.data[i];
      if (spectrum.id === id) return i;
    }
    return undefined;
  }

  getNormalizedData() {
    if (!this.data || !this.data[0]) return {};
    let matrix = [];
    let meta = [];
    let ids = [];
    for (let datum of this.data) {
      ids.push(datum.id);
      matrix.push(datum.normalized.y);
      meta.push(datum.meta);
    }
    let x = this.data[0].normalized.x;
    return { ids, matrix, meta, x };
  }

  getChart(options = {}) {
    const { ids, filter = {}, mode = this.mode } = options;
    let chart = {
      data: []
    };
    for (let datum of this.data) {
      if (!ids || ids.includes(datum.id)) {
        let data = datum.spectrum.getData({ mode, filter });
        data.styles = {
          unselected: {
            lineColor: datum.meta.color || 'darkgrey',
            lineWidth: 1,
            lineStyle: 1
          },
          selected: {
            lineColor: datum.meta.color || 'darkgrey',
            lineWidth: 3,
            lineStyle: 1
          }
        };
        data.label = datum.meta.id || datum.id;
        chart.data.push(data);
      }
    }
    return chart;
  }
}
