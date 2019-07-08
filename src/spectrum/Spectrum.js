import sortX from 'ml-array-xy-sort-x';

import { getData } from '../jsgraph/getData';

import { getNormalized } from './getNormalized';

/**
 * Class allowing manipulate one IR spectrum
 * @class spectrum
 * @param {object} [json={}] - object containing a spectrum
 * @param {Array} [json.x=[]] - x values
 * @param {Array} [json.y=[]] - y values
 */
export class Spectrum {
  constructor(x, y, options = {}) {
    const { meta = {} } = options;

    if (x && x.length > 1 && x[0] > x[1]) {
      this.x = x.reverse();
      this.y = y.reverse();
    } else {
      this.x = x || [];
      this.y = y || [];
    }

    this.meta = meta;
    this.normalized = undefined;
  }

  getXY() {
    return { x: this.x, y: this.y };
  }
}

Spectrum.prototype.getData = function (options) {
  return getData(this, options);
};

Spectrum.prototype.getNormalized = function (options) {
  if (!this.normalized) getNormalized(this, options);
  return this.normalized;
};
