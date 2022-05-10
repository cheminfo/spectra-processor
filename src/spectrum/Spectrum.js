import { xMinMaxValues } from 'ml-spectra-processing';

import { getData } from './getData';
import { getNormalized } from './getNormalized';
import { updateRangesInfo } from './updateRangesInfo';

/**
 * Class allowing manipulate one IR spectrum
 * @class spectrum
 * @param {object} [json={}] - object containing a spectrum
 * @param {Array} [json.x=[]] - x values
 * @param {Array} [json.y=[]] - y values
 */
export class Spectrum {
  /**
   *
   * @param {DataXY} data
   * @param {string} id
   * @param {object} [options={}]
   * @param {string} [options.groupID]
   * @param {object} [options.meta={}]
   * @param {object} [options.normalization]
   * @param {object} [options.normalized]
   */
  constructor(data, id, options = {}) {
    const { meta = {}, normalization = {}, normalized, groupID = id } = options;

    const { x, y } = data;

    if (x && x.length > 1 && x[0] > x[x.length - 1]) {
      this.x = x.slice().reverse();
      this.y = y.slice().reverse();
    } else {
      this.x = x || [];
      this.y = y || [];
    }
    this.id = id;
    this.groupID = groupID;
    this.meta = meta;
    this.normalizedBoundary = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    if (normalized) {
      this.normalized = normalized;
      this.updateNormalizedBoundary();
      this.normalizedAllowedBoundary = this.normalizedBoundary;
    } else {
      this.updateNormalization(normalization);
    }

    this.updateMemory();
  }

  get minX() {
    return this.x[0];
  }

  get maxX() {
    return this.x[this.x.length - 1];
  }

  updateMemory() {
    let original = ((this.x && this.x.length) || 0) * 16;
    let normalized = this.normalized.x.length * 16;
    this.memory = { original, normalized, total: original + normalized };
  }

  removeOriginal() {
    this.x = undefined;
    this.y = undefined;
    this.updateMemory();
  }

  getXY() {
    if (!Array.isArray(this.x) || !Array.isArray(this.y)) {
      throw new Error('Can not get normalized data');
    }
    return { x: this.x, y: this.y };
  }

  updateRangesInfo(ranges) {
    updateRangesInfo(this, ranges);
  }

  updateNormalization(normalization) {
    const result = getNormalized(this, normalization);
    this.normalized = result.data;
    this.normalizedAllowedBoundary = result.allowedBoundary;
    this.ranges = {};
    this.updateMemory();
    this.updateNormalizedBoundary();
  }

  getData(options) {
    return getData(this, options);
  }

  updateNormalizedBoundary() {
    this.normalizedBoundary.x = {
      min: this.normalized.x[0],
      max: this.normalized.x[this.normalized.x.length - 1],
    };
    this.normalizedBoundary.y = xMinMaxValues(this.normalized.y);
  }
}
