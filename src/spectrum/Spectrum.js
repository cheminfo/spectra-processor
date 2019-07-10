import { getData } from '../jsgraph/getData';

import { updateNormalized } from './updateNormalized';

/**
 * Class allowing manipulate one IR spectrum
 * @class spectrum
 * @param {object} [json={}] - object containing a spectrum
 * @param {Array} [json.x=[]] - x values
 * @param {Array} [json.y=[]] - y values
 */
export class Spectrum {
  constructor(x, y, id, options = {}) {
    const { meta = {} } = options;
    if (!id) throw new Error('Spectrum: id is mandatory');

    if (x && x.length > 1 && x[0] > x[1]) {
      this.x = x.reverse();
      this.y = y.reverse();
    } else {
      this.x = x || [];
      this.y = y || [];
    }
    this.id = id;
    this.meta = meta;
    this.normalized = undefined;
  }

  getXY() {
    return { x: this.x, y: this.y };
  }

  max(from, to) {}
}

Spectrum.prototype.getData = function (options) {
  return getData(this, options);
};

Spectrum.prototype.updateNormalized = function (options) {
  return updateNormalized(this, options);
};
