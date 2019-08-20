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
   * @param {array} x
   * @param {array} y
   * @param {string} id
   * @param {object} [options={}]
   */
  constructor(x, y, id, options = {}) {
    const { meta = {}, normalization = {} } = options;
    if (x && x.length > 1 && x[0] > x[1]) {
      this.x = x.reverse();
      this.y = y.reverse();
    } else {
      this.x = x || [];
      this.y = y || [];
    }
    this.id = id;
    this.meta = meta;
    this.normalized = getNormalized(this, normalization);
    this.updateMemory();
  }

  updateMemory() {
    this.memory =
      ((this.x && this.x.length) || 0) * 16 + this.normalized.x.length * 16;
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
}

Spectrum.prototype.getData = function (options) {
  return getData(this, options);
};

Spectrum.prototype.updateNormalization = function (normalization) {
  this.normalized = getNormalized(this, normalization);
  this.ranges = {};
  this.updateMemory();
};

Spectrum.prototype.updateRangesInfo = function (ranges) {
  updateRangesInfo(this, ranges);
};
