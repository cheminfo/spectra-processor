/**
 * spectra-processor
 * @version v0.0.3
 * @link https://github.com/cheminfo/spectra-processor#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SpectraProcessor"] = factory();
	else
		root["SpectraProcessor"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toString = Object.prototype.toString;

function isAnyArray(object) {
  return toString.call(object).endsWith('Array]');
}

module.exports = isAnyArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var filterX = _interopDefault(__webpack_require__(6));

var equallySpaced = _interopDefault(__webpack_require__(5));

var Stat = _interopDefault(__webpack_require__(2));

var mlSpectraProcessing = __webpack_require__(4);

var jcampconverter = __webpack_require__(3);
/**
 *
 * @param {*} spectrum
 * @param {object} [options={}]
 *
 */


function getData(spectrum) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    filter
  } = options;
  let data = {
    x: [],
    y: []
  };

  if (filter) {
    data = filterX({
      x: spectrum.x,
      y: spectrum.y
    }, filter);
  }

  return data;
}

function updateNormalized(spectrum) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let {
    from = spectrum.x[0],
    to = spectrum.x[spectrum.x.length - 1],
    numberOfPoints = 1024,
    processes = [],
    exclusions = []
  } = options;
  let y = spectrum.y.slice(0);

  for (let process of processes) {
    switch (process.kind) {
      case 'centerMean':
        {
          let mean = Stat.mean(spectrum.y);

          let meanFct = y => y - mean;

          y = y.map(meanFct);
          break;
        }

      case 'scaleSD':
        {
          let std = Stat.standardDeviation(spectrum.y);

          let stdFct = y => y / std;

          y = y.map(stdFct);
          break;
        }

      default:
        throw new Error("Unknown process kind: ".concat(process.kind));
    }
  }

  let result = equallySpaced({
    x: spectrum.x,
    y
  }, {
    from,
    to,
    numberOfPoints,
    exclusions
  });
  spectrum.normalized = result;
  return result;
}

function updateRangesInfo(spectrum) {
  let ranges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  spectrum.ranges = {};

  for (let range of ranges) {
    range = JSON.parse(JSON.stringify(range));
    spectrum.ranges[range.label] = range;
    let fromToIndex = {
      fromIndex: mlSpectraProcessing.arrayFindClosestIndex(spectrum.normalized.x, range.from),
      toIndex: mlSpectraProcessing.arrayFindClosestIndex(spectrum.normalized.x, range.to)
    };
    range.integration = mlSpectraProcessing.xyIntegration(spectrum.normalized, fromToIndex);
    range.maxPoint = mlSpectraProcessing.xyMaxYPoint(spectrum.normalized, fromToIndex);
  }
}
/**
 * Class allowing manipulate one IR spectrum
 * @class spectrum
 * @param {object} [json={}] - object containing a spectrum
 * @param {Array} [json.x=[]] - x values
 * @param {Array} [json.y=[]] - y values
 */


class Spectrum {
  constructor(x, y, id) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const {
      meta = {}
    } = options;
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
    return {
      x: this.x,
      y: this.y
    };
  }

}

Spectrum.prototype.getData = function (options) {
  return getData(this, options);
};

Spectrum.prototype.updateNormalized = function (options) {
  return updateNormalized(this, options);
};

Spectrum.prototype.updateRangesInfo = function (ranges) {
  updateRangesInfo(this, ranges);
};

function getJcampKind(data) {
  let datatype = data.spectra[0].dataType.toLowerCase();
  let yUnit = data.spectra[0].yUnit.toLowerCase();

  if (datatype.match(/infrared/)) {
    if (yUnit.match(/absorbance/)) {
      return IR_ABSORBANCE;
    } else {
      return IR_TRANSMITTANCE;
    }
  }

  return undefined;
}

const IR_TRANSMITTANCE = {
  normalization: {},
  importation: {
    converter: transmittance => -Math.log10(transmittance)
  },
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance'
  }
};
const IR_ABSORBANCE = {
  normalization: {},
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance'
  }
};
/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {string} jcamp - String containing the JCAMP data
 * @return {Spectrum} - New class element with the given data
 */

function jcamp(jcamp) {
  const parsed = jcampconverter.convert(jcamp, {
    xy: true
  });
  const kind = getJcampKind(parsed);
  const data = parsed.spectra[0].data[0]; // we convert the data

  if (kind && kind.importation && kind.importation.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return {
    data,
    kind
  };
}

function getFilterAnnotations() {
  let filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let {
    exclusions = []
  } = filter;
  let annotations = [];
  exclusions = exclusions.filter(exclusion => !exclusion.ignore);
  annotations = exclusions.map(exclusion => {
    var annotation = {
      type: 'rect',
      position: [{
        x: exclusion.from,
        y: -200
      }, {
        x: exclusion.to,
        y: 200
      }],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)'
    };
    return annotation;
  });

  if (filter.from !== undefined) {
    annotations.push({
      type: 'rect',
      position: [{
        x: 0,
        y: -200
      }, {
        x: filter.from,
        y: 200
      }],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)'
    });
  }

  if (filter.to !== undefined) {
    annotations.push({
      type: 'rect',
      position: [{
        x: filter.to,
        y: -200
      }, {
        x: 10000,
        y: 200
      }],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)'
    });
  }

  return annotations;
}

class SpectraProcessor {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.keepOriginalData = options.keepOriginalData === undefined ? false : options.keepOriginalData;
    this.normalizationFilter = undefined;
    this.spectra = [];
  }

  getFilterAnnotations() {
    return getFilterAnnotations(this.normalizationFilter);
  }

  setNormalizationFilter() {
    let normalizationFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.keepOriginalData && this.spectra.length > 0) {
      throw new Error('Can not change normalization filter, missing original data. Use the option keepOriginalData=true.');
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


  addFromJcamp(jcamp$1, id) {
    let meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (force === false && this.contains(id)) {
      return;
    }

    let parsed = jcamp(jcamp$1);
    this.createAndAddSpectrum(parsed, id, meta);
  }

  updateRangesInfo(options) {
    for (let spectrum of this.spectra) {
      spectrum.updateRangesInfo(options);
    }
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
    return this.spectra.splice(index, 1);
  }

  removeSpectraNotIn(ids) {
    let currentIDs = this.spectra.map(spectrum => spectrum.id);

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

  getSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.spectra[index];
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
    return {
      ids,
      matrix,
      meta,
      x
    };
  }

  getNormalizedChart() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      ids
    } = options;
    let chart = {
      data: []
    };

    for (let spectrum of this.spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        let data = spectrum.normalized;
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

  getChart() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      ids,
      filter = {}
    } = options;
    let chart = {
      data: []
    };

    for (let spectrum of this.spectra) {
      if (!ids || ids.includes(spectrum.id)) {
        let data = spectrum.getData({
          filter
        });
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

exports.SpectraProcessor = SpectraProcessor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function compareNumbers(a, b) {
  return a - b;
}
/**
 * Computes the sum of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.sum = function sum(values) {
  var sum = 0;

  for (var i = 0; i < values.length; i++) {
    sum += values[i];
  }

  return sum;
};
/**
 * Computes the maximum of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.max = function max(values) {
  var max = values[0];
  var l = values.length;

  for (var i = 1; i < l; i++) {
    if (values[i] > max) max = values[i];
  }

  return max;
};
/**
 * Computes the minimum of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.min = function min(values) {
  var min = values[0];
  var l = values.length;

  for (var i = 1; i < l; i++) {
    if (values[i] < min) min = values[i];
  }

  return min;
};
/**
 * Computes the min and max of the given values
 * @param {Array} values
 * @returns {{min: number, max: number}}
 */


exports.minMax = function minMax(values) {
  var min = values[0];
  var max = values[0];
  var l = values.length;

  for (var i = 1; i < l; i++) {
    if (values[i] < min) min = values[i];
    if (values[i] > max) max = values[i];
  }

  return {
    min: min,
    max: max
  };
};
/**
 * Computes the arithmetic mean of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.arithmeticMean = function arithmeticMean(values) {
  var sum = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    sum += values[i];
  }

  return sum / l;
};
/**
 * {@link arithmeticMean}
 */


exports.mean = exports.arithmeticMean;
/**
 * Computes the geometric mean of the given values
 * @param {Array} values
 * @returns {number}
 */

exports.geometricMean = function geometricMean(values) {
  var mul = 1;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    mul *= values[i];
  }

  return Math.pow(mul, 1 / l);
};
/**
 * Computes the mean of the log of the given values
 * If the return value is exponentiated, it gives the same result as the
 * geometric mean.
 * @param {Array} values
 * @returns {number}
 */


exports.logMean = function logMean(values) {
  var lnsum = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    lnsum += Math.log(values[i]);
  }

  return lnsum / l;
};
/**
 * Computes the weighted grand mean for a list of means and sample sizes
 * @param {Array} means - Mean values for each set of samples
 * @param {Array} samples - Number of original values for each set of samples
 * @returns {number}
 */


exports.grandMean = function grandMean(means, samples) {
  var sum = 0;
  var n = 0;
  var l = means.length;

  for (var i = 0; i < l; i++) {
    sum += samples[i] * means[i];
    n += samples[i];
  }

  return sum / n;
};
/**
 * Computes the truncated mean of the given values using a given percentage
 * @param {Array} values
 * @param {number} percent - The percentage of values to keep (range: [0,1])
 * @param {boolean} [alreadySorted=false]
 * @returns {number}
 */


exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
  if (alreadySorted === undefined) alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var l = values.length;
  var k = Math.floor(l * percent);
  var sum = 0;

  for (var i = k; i < l - k; i++) {
    sum += values[i];
  }

  return sum / (l - 2 * k);
};
/**
 * Computes the harmonic mean of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.harmonicMean = function harmonicMean(values) {
  var sum = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    if (values[i] === 0) {
      throw new RangeError('value at index ' + i + 'is zero');
    }

    sum += 1 / values[i];
  }

  return l / sum;
};
/**
 * Computes the contraharmonic mean of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.contraHarmonicMean = function contraHarmonicMean(values) {
  var r1 = 0;
  var r2 = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    r1 += values[i] * values[i];
    r2 += values[i];
  }

  if (r2 < 0) {
    throw new RangeError('sum of values is negative');
  }

  return r1 / r2;
};
/**
 * Computes the median of the given values
 * @param {Array} values
 * @param {boolean} [alreadySorted=false]
 * @returns {number}
 */


exports.median = function median(values, alreadySorted) {
  if (alreadySorted === undefined) alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var l = values.length;
  var half = Math.floor(l / 2);

  if (l % 2 === 0) {
    return (values[half - 1] + values[half]) * 0.5;
  } else {
    return values[half];
  }
};
/**
 * Computes the variance of the given values
 * @param {Array} values
 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
 * @returns {number}
 */


exports.variance = function variance(values, unbiased) {
  if (unbiased === undefined) unbiased = true;
  var theMean = exports.mean(values);
  var theVariance = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    var x = values[i] - theMean;
    theVariance += x * x;
  }

  if (unbiased) {
    return theVariance / (l - 1);
  } else {
    return theVariance / l;
  }
};
/**
 * Computes the standard deviation of the given values
 * @param {Array} values
 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
 * @returns {number}
 */


exports.standardDeviation = function standardDeviation(values, unbiased) {
  return Math.sqrt(exports.variance(values, unbiased));
};

exports.standardError = function standardError(values) {
  return exports.standardDeviation(values) / Math.sqrt(values.length);
};
/**
 * IEEE Transactions on biomedical engineering, vol. 52, no. 1, january 2005, p. 76-
 * Calculate the standard deviation via the Median of the absolute deviation
 *  The formula for the standard deviation only holds for Gaussian random variables.
 * @returns {{mean: number, stdev: number}}
 */


exports.robustMeanAndStdev = function robustMeanAndStdev(y) {
  var mean = 0,
      stdev = 0;
  var length = y.length,
      i = 0;

  for (i = 0; i < length; i++) {
    mean += y[i];
  }

  mean /= length;
  var averageDeviations = new Array(length);

  for (i = 0; i < length; i++) averageDeviations[i] = Math.abs(y[i] - mean);

  averageDeviations.sort(compareNumbers);

  if (length % 2 === 1) {
    stdev = averageDeviations[(length - 1) / 2] / 0.6745;
  } else {
    stdev = 0.5 * (averageDeviations[length / 2] + averageDeviations[length / 2 - 1]) / 0.6745;
  }

  return {
    mean: mean,
    stdev: stdev
  };
};

exports.quartiles = function quartiles(values, alreadySorted) {
  if (typeof alreadySorted === 'undefined') alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var quart = values.length / 4;
  var q1 = values[Math.ceil(quart) - 1];
  var q2 = exports.median(values, true);
  var q3 = values[Math.ceil(quart * 3) - 1];
  return {
    q1: q1,
    q2: q2,
    q3: q3
  };
};

exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
  return Math.sqrt(exports.pooledVariance(samples, unbiased));
};

exports.pooledVariance = function pooledVariance(samples, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var sum = 0;
  var length = 0,
      l = samples.length;

  for (var i = 0; i < l; i++) {
    var values = samples[i];
    var vari = exports.variance(values);
    sum += (values.length - 1) * vari;
    if (unbiased) length += values.length - 1;else length += values.length;
  }

  return sum / length;
};

exports.mode = function mode(values) {
  var l = values.length,
      itemCount = new Array(l),
      i;

  for (i = 0; i < l; i++) {
    itemCount[i] = 0;
  }

  var itemArray = new Array(l);
  var count = 0;

  for (i = 0; i < l; i++) {
    var index = itemArray.indexOf(values[i]);
    if (index >= 0) itemCount[index]++;else {
      itemArray[count] = values[i];
      itemCount[count] = 1;
      count++;
    }
  }

  var maxValue = 0,
      maxIndex = 0;

  for (i = 0; i < count; i++) {
    if (itemCount[i] > maxValue) {
      maxValue = itemCount[i];
      maxIndex = i;
    }
  }

  return itemArray[maxIndex];
};

exports.covariance = function covariance(vector1, vector2, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var mean1 = exports.mean(vector1);
  var mean2 = exports.mean(vector2);
  if (vector1.length !== vector2.length) throw 'Vectors do not have the same dimensions';
  var cov = 0,
      l = vector1.length;

  for (var i = 0; i < l; i++) {
    var x = vector1[i] - mean1;
    var y = vector2[i] - mean2;
    cov += x * y;
  }

  if (unbiased) return cov / (l - 1);else return cov / l;
};

exports.skewness = function skewness(values, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var theMean = exports.mean(values);
  var s2 = 0,
      s3 = 0,
      l = values.length;

  for (var i = 0; i < l; i++) {
    var dev = values[i] - theMean;
    s2 += dev * dev;
    s3 += dev * dev * dev;
  }

  var m2 = s2 / l;
  var m3 = s3 / l;
  var g = m3 / Math.pow(m2, 3 / 2.0);

  if (unbiased) {
    var a = Math.sqrt(l * (l - 1));
    var b = l - 2;
    return a / b * g;
  } else {
    return g;
  }
};

exports.kurtosis = function kurtosis(values, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var theMean = exports.mean(values);
  var n = values.length,
      s2 = 0,
      s4 = 0;

  for (var i = 0; i < n; i++) {
    var dev = values[i] - theMean;
    s2 += dev * dev;
    s4 += dev * dev * dev * dev;
  }

  var m2 = s2 / n;
  var m4 = s4 / n;

  if (unbiased) {
    var v = s2 / (n - 1);
    var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
    var b = s4 / (v * v);
    var c = (n - 1) * (n - 1) / ((n - 2) * (n - 3));
    return a * b - 3 * c;
  } else {
    return m4 / (m2 * m2) - 3;
  }
};

exports.entropy = function entropy(values, eps) {
  if (typeof eps === 'undefined') eps = 0;
  var sum = 0,
      l = values.length;

  for (var i = 0; i < l; i++) sum += values[i] * Math.log(values[i] + eps);

  return -sum;
};

exports.weightedMean = function weightedMean(values, weights) {
  var sum = 0,
      l = values.length;

  for (var i = 0; i < l; i++) sum += values[i] * weights[i];

  return sum;
};

exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
  return Math.sqrt(exports.weightedVariance(values, weights));
};

exports.weightedVariance = function weightedVariance(values, weights) {
  var theMean = exports.weightedMean(values, weights);
  var vari = 0,
      l = values.length;
  var a = 0,
      b = 0;

  for (var i = 0; i < l; i++) {
    var z = values[i] - theMean;
    var w = weights[i];
    vari += w * (z * z);
    b += w;
    a += w * w;
  }

  return vari * (b / (b * b - a));
};

exports.center = function center(values, inPlace) {
  if (typeof inPlace === 'undefined') inPlace = false;
  var result = values;
  if (!inPlace) result = [].concat(values);
  var theMean = exports.mean(result),
      l = result.length;

  for (var i = 0; i < l; i++) result[i] -= theMean;
};

exports.standardize = function standardize(values, standardDev, inPlace) {
  if (typeof standardDev === 'undefined') standardDev = exports.standardDeviation(values);
  if (typeof inPlace === 'undefined') inPlace = false;
  var l = values.length;
  var result = inPlace ? values : new Array(l);

  for (var i = 0; i < l; i++) result[i] = values[i] / standardDev;

  return result;
};

exports.cumulativeSum = function cumulativeSum(array) {
  var l = array.length;
  var result = new Array(l);
  result[0] = array[0];

  for (var i = 1; i < l; i++) result[i] = result[i - 1] + array[i];

  return result;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getConverter() {
  // the following RegExp can only be used for XYdata, some peakTables have values with a "E-5" ...
  const ntuplesSeparator = /[, \t]+/;
  const GC_MS_FIELDS = ['TIC', '.RIC', 'SCANNUMBER'];

  function convertToFloatArray(stringArray) {
    var floatArray = [];

    for (let i = 0; i < stringArray.length; i++) {
      floatArray.push(parseFloat(stringArray[i]));
    }

    return floatArray;
  }

  class Spectrum {}

  const defaultOptions = {
    keepRecordsRegExp: /^$/,
    xy: false,
    withoutXY: false,
    chromatogram: false,
    keepSpectra: false,
    noContour: false,
    nbContourLevels: 7,
    noiseMultiplier: 5,
    profiling: false
  };

  function convert(jcamp, options) {
    options = Object.assign({}, defaultOptions, options);
    var wantXY = !options.withoutXY;
    var start = Date.now();
    var ntuples = {};
    var ldr, dataLabel, dataValue, ldrs;
    var position, endLine, infos;
    var result = {};
    result.profiling = options.profiling ? [] : false;
    result.logs = [];
    var spectra = [];
    result.spectra = spectra;
    result.info = {};
    var spectrum = new Spectrum();

    if (!(typeof jcamp === 'string')) {
      throw new TypeError('the JCAMP should be a string');
    }

    if (result.profiling) {
      result.profiling.push({
        action: 'Before split to LDRS',
        time: Date.now() - start
      });
    }

    ldrs = jcamp.split(/[\r\n]+##/);

    if (result.profiling) {
      result.profiling.push({
        action: 'Split to LDRS',
        time: Date.now() - start
      });
    }

    if (ldrs[0]) ldrs[0] = ldrs[0].replace(/^[\r\n ]*##/, '');

    for (let i = 0; i < ldrs.length; i++) {
      ldr = ldrs[i]; // This is a new LDR

      position = ldr.indexOf('=');

      if (position > 0) {
        dataLabel = ldr.substring(0, position);
        dataValue = ldr.substring(position + 1).trim();
      } else {
        dataLabel = ldr;
        dataValue = '';
      }

      dataLabel = dataLabel.replace(/[_ -]/g, '').toUpperCase();

      if (dataLabel === 'DATATABLE') {
        endLine = dataValue.indexOf('\n');
        if (endLine === -1) endLine = dataValue.indexOf('\r');

        if (endLine > 0) {
          var xIndex = -1;
          var yIndex = -1; // ##DATA TABLE= (X++(I..I)), XYDATA
          // We need to find the variables

          infos = dataValue.substring(0, endLine).split(/[ ,;\t]+/);

          if (infos[0].indexOf('++') > 0) {
            var firstVariable = infos[0].replace(/.*\(([a-zA-Z0-9]+)\+\+.*/, '$1');
            var secondVariable = infos[0].replace(/.*\.\.([a-zA-Z0-9]+).*/, '$1');
            xIndex = ntuples.symbol.indexOf(firstVariable);
            yIndex = ntuples.symbol.indexOf(secondVariable);
          }

          if (xIndex === -1) xIndex = 0;
          if (yIndex === -1) yIndex = 0;

          if (ntuples.first) {
            if (ntuples.first.length > xIndex) {
              spectrum.firstX = ntuples.first[xIndex];
            }

            if (ntuples.first.length > yIndex) {
              spectrum.firstY = ntuples.first[yIndex];
            }
          }

          if (ntuples.last) {
            if (ntuples.last.length > xIndex) {
              spectrum.lastX = ntuples.last[xIndex];
            }

            if (ntuples.last.length > yIndex) {
              spectrum.lastY = ntuples.last[yIndex];
            }
          }

          if (ntuples.vardim && ntuples.vardim.length > xIndex) {
            spectrum.nbPoints = ntuples.vardim[xIndex];
          }

          if (ntuples.factor) {
            if (ntuples.factor.length > xIndex) {
              spectrum.xFactor = ntuples.factor[xIndex];
            }

            if (ntuples.factor.length > yIndex) {
              spectrum.yFactor = ntuples.factor[yIndex];
            }
          }

          if (ntuples.units) {
            if (ntuples.units.length > xIndex) {
              spectrum.xUnit = ntuples.units[xIndex];
            }

            if (ntuples.units.length > yIndex) {
              spectrum.yUnit = ntuples.units[yIndex];
            }
          }

          spectrum.datatable = infos[0];

          if (infos[1] && infos[1].indexOf('PEAKS') > -1) {
            dataLabel = 'PEAKTABLE';
          } else if (infos[1] && (infos[1].indexOf('XYDATA') || infos[0].indexOf('++') > 0)) {
            dataLabel = 'XYDATA';
            spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
          }
        }
      }

      if (dataLabel === 'XYDATA') {
        if (wantXY) {
          prepareSpectrum(result, spectrum); // well apparently we should still consider it is a PEAK TABLE if there are no '++' after

          if (dataValue.match(/.*\+\+.*/)) {
            // ex: (X++(Y..Y))
            if (!spectrum.deltaX) {
              spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
            }

            fastParseXYData(spectrum, dataValue, result);
          } else {
            parsePeakTable(spectrum, dataValue, result);
          }

          spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      } else if (dataLabel === 'PEAKTABLE') {
        if (wantXY) {
          prepareSpectrum(result, spectrum);
          parsePeakTable(spectrum, dataValue, result);
          spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (dataLabel === 'PEAKASSIGNMENTS') {
        if (wantXY) {
          if (dataValue.match(/.*(XYA).*/)) {
            // ex: (XYA)
            parseXYA(spectrum, dataValue);
          }

          spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (dataLabel === 'TITLE') {
        spectrum.title = dataValue;
      } else if (dataLabel === 'DATATYPE') {
        spectrum.dataType = dataValue;

        if (dataValue.indexOf('nD') > -1) {
          result.twoD = true;
        }
      } else if (dataLabel === 'NTUPLES') {
        if (dataValue.indexOf('nD') > -1) {
          result.twoD = true;
        }
      } else if (dataLabel === 'XUNITS') {
        spectrum.xUnit = dataValue;
      } else if (dataLabel === 'YUNITS') {
        spectrum.yUnit = dataValue;
      } else if (dataLabel === 'FIRSTX') {
        spectrum.firstX = parseFloat(dataValue);
      } else if (dataLabel === 'LASTX') {
        spectrum.lastX = parseFloat(dataValue);
      } else if (dataLabel === 'FIRSTY') {
        spectrum.firstY = parseFloat(dataValue);
      } else if (dataLabel === 'LASTY') {
        spectrum.lastY = parseFloat(dataValue);
      } else if (dataLabel === 'NPOINTS') {
        spectrum.nbPoints = parseFloat(dataValue);
      } else if (dataLabel === 'XFACTOR') {
        spectrum.xFactor = parseFloat(dataValue);
      } else if (dataLabel === 'YFACTOR') {
        spectrum.yFactor = parseFloat(dataValue);
      } else if (dataLabel === 'MAXX') {
        spectrum.maxX = parseFloat(dataValue);
      } else if (dataLabel === 'MINX') {
        spectrum.minX = parseFloat(dataValue);
      } else if (dataLabel === 'MAXY') {
        spectrum.maxY = parseFloat(dataValue);
      } else if (dataLabel === 'MINY') {
        spectrum.minY = parseFloat(dataValue);
      } else if (dataLabel === 'DELTAX') {
        spectrum.deltaX = parseFloat(dataValue);
      } else if (dataLabel === '.OBSERVEFREQUENCY' || dataLabel === '$SFO1') {
        if (!spectrum.observeFrequency) {
          spectrum.observeFrequency = parseFloat(dataValue);
        }
      } else if (dataLabel === '.OBSERVENUCLEUS') {
        if (!spectrum.xType) {
          result.xType = dataValue.replace(/[^a-zA-Z0-9]/g, '');
        }
      } else if (dataLabel === '$SFO2') {
        if (!result.indirectFrequency) {
          result.indirectFrequency = parseFloat(dataValue);
        }
      } else if (dataLabel === '$OFFSET') {
        // OFFSET for Bruker spectra
        result.shiftOffsetNum = 0;

        if (!spectrum.shiftOffsetVal) {
          spectrum.shiftOffsetVal = parseFloat(dataValue);
        }
      } else if (dataLabel === '$REFERENCEPOINT') {// OFFSET for Varian spectra
        // if we activate this part it does not work for ACD specmanager
        //         } else if (dataLabel=='.SHIFTREFERENCE') {   // OFFSET FOR Bruker Spectra
        //                 var parts = dataValue.split(/ *, */);
        //                 result.shiftOffsetNum = parseInt(parts[2].trim());
        //                 spectrum.shiftOffsetVal = parseFloat(parts[3].trim());
      } else if (dataLabel === 'VARNAME') {
        ntuples.varname = dataValue.split(ntuplesSeparator);
      } else if (dataLabel === 'SYMBOL') {
        ntuples.symbol = dataValue.split(ntuplesSeparator);
      } else if (dataLabel === 'VARTYPE') {
        ntuples.vartype = dataValue.split(ntuplesSeparator);
      } else if (dataLabel === 'VARFORM') {
        ntuples.varform = dataValue.split(ntuplesSeparator);
      } else if (dataLabel === 'VARDIM') {
        ntuples.vardim = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (dataLabel === 'UNITS') {
        ntuples.units = dataValue.split(ntuplesSeparator);
      } else if (dataLabel === 'FACTOR') {
        ntuples.factor = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (dataLabel === 'FIRST') {
        ntuples.first = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (dataLabel === 'LAST') {
        ntuples.last = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (dataLabel === 'MIN') {
        ntuples.min = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (dataLabel === 'MAX') {
        ntuples.max = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (dataLabel === '.NUCLEUS') {
        if (result.twoD) {
          result.yType = dataValue.split(ntuplesSeparator)[0];
        }
      } else if (dataLabel === 'PAGE') {
        spectrum.page = dataValue.trim();
        spectrum.pageValue = parseFloat(dataValue.replace(/^.*=/, ''));
        spectrum.pageSymbol = spectrum.page.replace(/[=].*/, '');
        var pageSymbolIndex = ntuples.symbol.indexOf(spectrum.pageSymbol);
        var unit = '';

        if (ntuples.units && ntuples.units[pageSymbolIndex]) {
          unit = ntuples.units[pageSymbolIndex];
        }

        if (result.indirectFrequency && unit !== 'PPM') {
          spectrum.pageValue /= result.indirectFrequency;
        }
      } else if (dataLabel === 'RETENTIONTIME') {
        spectrum.pageValue = parseFloat(dataValue);
      } else if (isMSField(dataLabel)) {
        spectrum[convertMSFieldToLabel(dataLabel)] = dataValue;
      } else if (dataLabel === 'SAMPLEDESCRIPTION') {
        spectrum.sampleDescription = dataValue;
      }

      if (dataLabel.match(options.keepRecordsRegExp)) {
        if (result.info[dataLabel]) {
          if (!Array.isArray(result.info[dataLabel])) {
            result.info[dataLabel] = [result.info[dataLabel]];
          }

          result.info[dataLabel].push(dataValue.trim());
        } else {
          result.info[dataLabel] = dataValue.trim();
        }
      }
    }

    if (result.profiling) {
      result.profiling.push({
        action: 'Finished parsing',
        time: Date.now() - start
      });
    }

    if (Object.keys(ntuples).length > 0) {
      var newNtuples = [];
      var keys = Object.keys(ntuples);

      for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var values = ntuples[key];

        for (let j = 0; j < values.length; j++) {
          if (!newNtuples[j]) newNtuples[j] = {};
          newNtuples[j][key] = values[j];
        }
      }

      result.ntuples = newNtuples;
    }

    if (result.twoD && wantXY) {
      add2D(result, options);

      if (result.profiling) {
        result.profiling.push({
          action: 'Finished countour plot calculation',
          time: Date.now() - start
        });
      }

      if (!options.keepSpectra) {
        delete result.spectra;
      }
    }

    if (options.chromatogram) {
      options.xy = true;
    }

    if (options.xy && wantXY) {
      // the spectraData should not be a oneD array but an object with x and y
      if (spectra.length > 0) {
        for (let i = 0; i < spectra.length; i++) {
          spectrum = spectra[i];

          if (spectrum.data.length > 0) {
            for (let j = 0; j < spectrum.data.length; j++) {
              var data = spectrum.data[j];
              var newData = {
                x: new Array(data.length / 2),
                y: new Array(data.length / 2)
              };

              for (var k = 0; k < data.length; k = k + 2) {
                newData.x[k / 2] = data[k];
                newData.y[k / 2] = data[k + 1];
              }

              spectrum.data[j] = newData;
            }
          }
        }
      }
    } // maybe it is a GC (HPLC) / MS. In this case we add a new format


    if (options.chromatogram) {
      if (result.spectra.length > 1) {
        complexChromatogram(result);
      } else {
        simpleChromatogram(result);
      }

      if (result.profiling) {
        result.profiling.push({
          action: 'Finished chromatogram calculation',
          time: Date.now() - start
        });
      }
    }

    if (result.profiling) {
      result.profiling.push({
        action: 'Total time',
        time: Date.now() - start
      });
    }

    return result;
  }

  function convertMSFieldToLabel(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function isMSField(dataLabel) {
    return GC_MS_FIELDS.indexOf(dataLabel) !== -1;
  }

  function complexChromatogram(result) {
    var spectra = result.spectra;
    var length = spectra.length;
    var chromatogram = {
      times: new Array(length),
      series: {
        ms: {
          dimension: 2,
          data: new Array(length)
        }
      }
    };
    var existingGCMSFields = [];

    for (let i = 0; i < GC_MS_FIELDS.length; i++) {
      var label = convertMSFieldToLabel(GC_MS_FIELDS[i]);

      if (spectra[0][label]) {
        existingGCMSFields.push(label);
        chromatogram.series[label] = {
          dimension: 1,
          data: new Array(length)
        };
      }
    }

    for (let i = 0; i < length; i++) {
      var spectrum = spectra[i];
      chromatogram.times[i] = spectrum.pageValue;

      for (let j = 0; j < existingGCMSFields.length; j++) {
        chromatogram.series[existingGCMSFields[j]].data[i] = parseFloat(spectrum[existingGCMSFields[j]]);
      }

      if (spectrum.data) {
        chromatogram.series.ms.data[i] = [spectrum.data[0].x, spectrum.data[0].y];
      }
    }

    result.chromatogram = chromatogram;
  }

  function simpleChromatogram(result) {
    var data = result.spectra[0].data[0];
    result.chromatogram = {
      times: data.x.slice(),
      series: {
        intensity: {
          dimension: 1,
          data: data.y.slice()
        }
      }
    };
  }

  function prepareSpectrum(result, spectrum) {
    if (!spectrum.xFactor) spectrum.xFactor = 1;
    if (!spectrum.yFactor) spectrum.yFactor = 1;

    if (spectrum.observeFrequency) {
      if (spectrum.xUnit && spectrum.xUnit.toUpperCase() === 'HZ') {
        spectrum.xUnit = 'PPM';
        spectrum.xFactor = spectrum.xFactor / spectrum.observeFrequency;
        spectrum.firstX = spectrum.firstX / spectrum.observeFrequency;
        spectrum.lastX = spectrum.lastX / spectrum.observeFrequency;
        spectrum.deltaX = spectrum.deltaX / spectrum.observeFrequency;
      }
    }

    if (spectrum.shiftOffsetVal) {
      var shift = spectrum.firstX - spectrum.shiftOffsetVal;
      spectrum.firstX = spectrum.firstX - shift;
      spectrum.lastX = spectrum.lastX - shift;
    }
  }

  function getMedian(data) {
    data = data.sort(compareNumbers);
    var l = data.length;
    return data[Math.floor(l / 2)];
  }

  function compareNumbers(a, b) {
    return a - b;
  }

  function convertTo3DZ(spectra) {
    var minZ = spectra[0].data[0][0];
    var maxZ = minZ;
    var ySize = spectra.length;
    var xSize = spectra[0].data[0].length / 2;
    var z = new Array(ySize);

    for (let i = 0; i < ySize; i++) {
      z[i] = new Array(xSize);
      var xVector = spectra[i].data[0];

      for (let j = 0; j < xSize; j++) {
        var value = xVector[j * 2 + 1];
        z[i][j] = value;
        if (value < minZ) minZ = value;
        if (value > maxZ) maxZ = value;
      }
    }

    const firstX = spectra[0].data[0][0];
    const lastX = spectra[0].data[0][spectra[0].data[0].length - 2]; // has to be -2 because it is a 1D array [x,y,x,y,...]

    const firstY = spectra[0].pageValue;
    const lastY = spectra[ySize - 1].pageValue; // Because the min / max value are the only information about the matrix if we invert
    // min and max we need to invert the array

    if (firstX > lastX) {
      for (let spectrum of z) {
        spectrum.reverse();
      }
    }

    if (firstY > lastY) {
      z.reverse();
    }

    return {
      z: z,
      minX: Math.min(firstX, lastX),
      maxX: Math.max(firstX, lastX),
      minY: Math.min(firstY, lastY),
      maxY: Math.max(firstY, lastY),
      minZ: minZ,
      maxZ: maxZ,
      noise: getMedian(z[0].map(Math.abs))
    };
  }

  function add2D(result, options) {
    var zData = convertTo3DZ(result.spectra);

    if (!options.noContour) {
      result.contourLines = generateContourLines(zData, options);
      delete zData.z;
    }

    result.minMax = zData;
  }

  function generateContourLines(zData, options) {
    var noise = zData.noise;
    var z = zData.z;
    var povarHeight0, povarHeight1, povarHeight2, povarHeight3;
    var isOver0, isOver1, isOver2, isOver3;
    var nbSubSpectra = z.length;
    var nbPovars = z[0].length;
    var pAx, pAy, pBx, pBy;
    var x0 = zData.minX;
    var xN = zData.maxX;
    var dx = (xN - x0) / (nbPovars - 1);
    var y0 = zData.minY;
    var yN = zData.maxY;
    var dy = (yN - y0) / (nbSubSpectra - 1);
    var minZ = zData.minZ;
    var maxZ = zData.maxZ; // System.out.prvarln('y0 '+y0+' yN '+yN);
    // -------------------------
    // Povars attribution
    //
    // 0----1
    // |  / |
    // | /  |
    // 2----3
    //
    // ---------------------d------

    var iter = options.nbContourLevels * 2;
    var contourLevels = new Array(iter);
    var lineZValue;

    for (var level = 0; level < iter; level++) {
      // multiply by 2 for positif and negatif
      var contourLevel = {};
      contourLevels[level] = contourLevel;
      var side = level % 2;
      var factor = (maxZ - options.noiseMultiplier * noise) * Math.exp((level >> 1) - options.nbContourLevels);

      if (side === 0) {
        lineZValue = factor + options.noiseMultiplier * noise;
      } else {
        lineZValue = 0 - factor - options.noiseMultiplier * noise;
      }

      var lines = [];
      contourLevel.zValue = lineZValue;
      contourLevel.lines = lines;
      if (lineZValue <= minZ || lineZValue >= maxZ) continue;

      for (var iSubSpectra = 0; iSubSpectra < nbSubSpectra - 1; iSubSpectra++) {
        var subSpectra = z[iSubSpectra];
        var subSpectraAfter = z[iSubSpectra + 1];

        for (var povar = 0; povar < nbPovars - 1; povar++) {
          povarHeight0 = subSpectra[povar];
          povarHeight1 = subSpectra[povar + 1];
          povarHeight2 = subSpectraAfter[povar];
          povarHeight3 = subSpectraAfter[povar + 1];
          isOver0 = povarHeight0 > lineZValue;
          isOver1 = povarHeight1 > lineZValue;
          isOver2 = povarHeight2 > lineZValue;
          isOver3 = povarHeight3 > lineZValue; // Example povar0 is over the plane and povar1 and
          // povar2 are below, we find the varersections and add
          // the segment

          if (isOver0 !== isOver1 && isOver0 !== isOver2) {
            pAx = povar + (lineZValue - povarHeight0) / (povarHeight1 - povarHeight0);
            pAy = iSubSpectra;
            pBx = povar;
            pBy = iSubSpectra + (lineZValue - povarHeight0) / (povarHeight2 - povarHeight0);
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // remove push does not help !!!!


          if (isOver3 !== isOver1 && isOver3 !== isOver2) {
            pAx = povar + 1;
            pAy = iSubSpectra + 1 - (lineZValue - povarHeight3) / (povarHeight1 - povarHeight3);
            pBx = povar + 1 - (lineZValue - povarHeight3) / (povarHeight2 - povarHeight3);
            pBy = iSubSpectra + 1;
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // test around the diagonal


          if (isOver1 !== isOver2) {
            pAx = (povar + 1 - (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dx + x0;
            pAy = (iSubSpectra + (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dy + y0;

            if (isOver1 !== isOver0) {
              pBx = povar + 1 - (lineZValue - povarHeight1) / (povarHeight0 - povarHeight1);
              pBy = iSubSpectra;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver0) {
              pBx = povar;
              pBy = iSubSpectra + 1 - (lineZValue - povarHeight2) / (povarHeight0 - povarHeight2);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver1 !== isOver3) {
              pBx = povar + 1;
              pBy = iSubSpectra + (lineZValue - povarHeight1) / (povarHeight3 - povarHeight1);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver3) {
              pBx = povar + (lineZValue - povarHeight2) / (povarHeight3 - povarHeight2);
              pBy = iSubSpectra + 1;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }
          }
        }
      }
    }

    return {
      minX: zData.minX,
      maxX: zData.maxX,
      minY: zData.minY,
      maxY: zData.maxY,
      segments: contourLevels
    };
  }

  function fastParseXYData(spectrum, value) {
    // TODO need to deal with result
    //  console.log(value);
    // we check if deltaX is defined otherwise we calculate it
    var yFactor = spectrum.yFactor;
    var deltaX = spectrum.deltaX;
    spectrum.isXYdata = true; // TODO to be improved using 2 array {x:[], y:[]}

    var currentData = [];
    spectrum.data = [currentData];
    var currentX = spectrum.firstX;
    var currentY = spectrum.firstY; // we skip the first line
    //

    var endLine = false;
    var ascii;
    let i = 0;

    for (; i < value.length; i++) {
      ascii = value.charCodeAt(i);

      if (ascii === 13 || ascii === 10) {
        endLine = true;
      } else {
        if (endLine) break;
      }
    } // we proceed taking the i after the first line


    var newLine = true;
    var isDifference = false;
    var isLastDifference = false;
    var lastDifference = 0;
    var isDuplicate = false;
    var inComment = false;
    var currentValue = 0; // can be a difference or a duplicate

    var lastValue = 0; // must be the real last value

    var isNegative = false;
    var inValue = false;
    var skipFirstValue = false;
    var decimalPosition = 0;

    for (; i <= value.length; i++) {
      if (i === value.length) ascii = 13;else ascii = value.charCodeAt(i);

      if (inComment) {
        // we should ignore the text if we are after $$
        if (ascii === 13 || ascii === 10) {
          newLine = true;
          inComment = false;
        }
      } else {
        // when is it a new value ?
        // when it is not a digit, . or comma
        // it is a number that is either new or we continue
        if (ascii <= 57 && ascii >= 48) {
          // a number
          inValue = true;

          if (decimalPosition > 0) {
            currentValue += (ascii - 48) / Math.pow(10, decimalPosition++);
          } else {
            currentValue *= 10;
            currentValue += ascii - 48;
          }
        } else if (ascii === 44 || ascii === 46) {
          // a "," or "."
          inValue = true;
          decimalPosition++;
        } else {
          if (inValue) {
            // need to process the previous value
            if (newLine) {
              newLine = false; // we don't check the X value
              // console.log("NEW LINE",isDifference, lastDifference);
              // if new line and lastDifference, the first value is just a check !
              // that we don't check ...

              if (isLastDifference) skipFirstValue = true;
            } else {
              // need to deal with duplicate and differences
              if (skipFirstValue) {
                skipFirstValue = false;
              } else {
                if (isDifference) {
                  lastDifference = isNegative ? 0 - currentValue : currentValue;
                  isLastDifference = true;
                  isDifference = false;
                } else if (!isDuplicate) {
                  lastValue = isNegative ? 0 - currentValue : currentValue;
                }

                var duplicate = isDuplicate ? currentValue - 1 : 1;

                for (var j = 0; j < duplicate; j++) {
                  if (isLastDifference) {
                    currentY += lastDifference;
                  } else {
                    currentY = lastValue;
                  }

                  currentData.push(currentX);
                  currentData.push(currentY * yFactor);
                  currentX += deltaX;
                }
              }
            }

            isNegative = false;
            currentValue = 0;
            decimalPosition = 0;
            inValue = false;
            isDuplicate = false;
          } // positive SQZ digits @ A B C D E F G H I (ascii 64-73)


          if (ascii < 74 && ascii > 63) {
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 64;
          } else if (ascii > 96 && ascii < 106) {
            // negative SQZ digits a b c d e f g h i (ascii 97-105)
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 96;
            isNegative = true;
          } else if (ascii === 115) {
            // DUP digits S T U V W X Y Z s (ascii 83-90, 115)
            inValue = true;
            isDuplicate = true;
            currentValue = 9;
          } else if (ascii > 82 && ascii < 91) {
            inValue = true;
            isDuplicate = true;
            currentValue = ascii - 82;
          } else if (ascii > 73 && ascii < 83) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 73;
          } else if (ascii > 105 && ascii < 115) {
            // negative DIF digits j k l m n o p q r (ascii 106-114)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 105;
            isNegative = true;
          } else if (ascii === 36 && value.charCodeAt(i + 1) === 36) {
            // $ sign, we need to check the next one
            inValue = true;
            inComment = true;
          } else if (ascii === 37) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = 0;
            isNegative = false;
          } else if (ascii === 45) {
            // a "-"
            // check if after there is a number, decimal or comma
            var ascii2 = value.charCodeAt(i + 1);

            if (ascii2 >= 48 && ascii2 <= 57 || ascii2 === 44 || ascii2 === 46) {
              inValue = true;
              if (!newLine) isLastDifference = false;
              isNegative = true;
            }
          } else if (ascii === 13 || ascii === 10) {
            newLine = true;
            inComment = false;
          } // and now analyse the details ... space or tabulation
          // if "+" we just don't care

        }
      }
    }
  }

  function parseXYA(spectrum, value) {
    var removeSymbolRegExp = /(\(+|\)+|<+|>+|\s+)/g;
    spectrum.isXYAdata = true;
    var values;
    var currentData = [];
    spectrum.data = [currentData];
    var lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      values = lines[i].trim().replace(removeSymbolRegExp, '').split(',');
      currentData.push(parseFloat(values[0]));
      currentData.push(parseFloat(values[1]));
    }
  }

  function parsePeakTable(spectrum, value, result) {
    var removeCommentRegExp = /\$\$.*/;
    var peakTableSplitRegExp = /[,\t ]+/;
    spectrum.isPeaktable = true;
    var values;
    var currentData = [];
    spectrum.data = [currentData]; // counts for around 20% of the time

    var lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % 2 === 0) {
        for (let j = 0; j < values.length; j = j + 2) {
          // takes around 40% of the time to add and parse the 2 values nearly exclusively because of parseFloat
          currentData.push(parseFloat(values[j]) * spectrum.xFactor);
          currentData.push(parseFloat(values[j + 1]) * spectrum.yFactor);
        }
      } else {
        result.logs.push("Format error: ".concat(values));
      }
    }
  }

  return convert;
}

var convert = getConverter();

function JcampConverter(input, options, useWorker) {
  if (typeof options === 'boolean') {
    useWorker = options;
    options = {};
  }

  if (useWorker) {
    return postToWorker(input, options);
  } else {
    return convert(input, options);
  }
}

var stamps = {};
var worker;

function postToWorker(input, options) {
  if (!worker) {
    createWorker();
  }

  return new Promise(function (resolve) {
    var stamp = "".concat(Date.now()).concat(Math.random());
    stamps[stamp] = resolve;
    worker.postMessage(JSON.stringify({
      stamp: stamp,
      input: input,
      options: options
    }));
  });
}

function createWorker() {
  var workerURL = URL.createObjectURL(new Blob(["var getConverter =".concat(getConverter.toString(), ";var convert = getConverter(); onmessage = function (event) { var data = JSON.parse(event.data); postMessage(JSON.stringify({stamp: data.stamp, output: convert(data.input, data.options)})); };")], {
    type: 'application/javascript'
  }));
  worker = new Worker(workerURL);
  URL.revokeObjectURL(workerURL);
  worker.addEventListener('message', function (event) {
    var data = JSON.parse(event.data);
    var stamp = data.stamp;

    if (stamps[stamp]) {
      stamps[stamp](data.output);
    }
  });
}

function createTree(jcamp) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    flatten = false
  } = options;

  if (typeof jcamp !== 'string') {
    throw new TypeError('the JCAMP should be a string');
  }

  let lines = jcamp.split(/[\r\n]+/);
  let flat = [];
  let stack = [];
  let result = [];
  let current;
  let ntupleLevel = 0;
  let spaces = jcamp.includes('## ');

  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    let labelLine = spaces ? line.replace(/ /g, '') : line;

    if (labelLine.substring(0, 9) === '##NTUPLES') {
      ntupleLevel++;
    }

    if (labelLine.substring(0, 7) === '##TITLE') {
      let title = [labelLine.substring(8).trim()];

      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('##')) {
          break;
        } else {
          title.push(lines[j].trim());
        }
      }

      stack.push({
        title: title.join('\n'),
        jcamp: "".concat(line, "\n"),
        children: []
      });
      current = stack[stack.length - 1];
      flat.push(current);
    } else if (labelLine.substring(0, 5) === '##END' && ntupleLevel === 0) {
      current.jcamp += "".concat(line, "\n");
      var finished = stack.pop();

      if (stack.length !== 0) {
        current = stack[stack.length - 1];
        current.children.push(finished);
      } else {
        current = undefined;
        result.push(finished);
      }
    } else if (current && current.jcamp) {
      current.jcamp += "".concat(line, "\n");
      var match = labelLine.match(/^##(.*?)=(.+)/);

      if (match) {
        var dataLabel = match[1].replace(/[ _-]/g, '').toUpperCase();

        if (dataLabel === 'DATATYPE') {
          current.dataType = match[2].trim();
        }
      }
    }

    if (labelLine.substring(0, 5) === '##END' && ntupleLevel > 0) {
      ntupleLevel--;
    }
  }

  if (flatten) {
    flat.forEach(entry => {
      entry.children = undefined;
    });
    return flat;
  } else {
    return result;
  }
}

module.exports = {
  convert: JcampConverter,
  createTree: createTree
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/array/arrayFindClosestIndex.js
/**
 * Returns the closest index of a `target` in an ordered array
 * @param {array} array
 * @param {number} target
 */
function arrayFindClosestIndex(array, target) {
  let low = 0;
  let high = array.length - 1;
  let middle = 0;

  while (high - low > 1) {
    middle = low + (high - low >> 1);

    if (array[middle] < target) {
      low = middle;
    } else if (array[middle] > target) {
      high = middle;
    } else {
      return middle;
    }
  }

  if (low < array.length - 1) {
    if (Math.abs(target - array[low]) < Math.abs(array[low + 1] - target)) {
      return low;
    } else {
      return low + 1;
    }
  } else {
    return low;
  }
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/array/arrayGetFromToIndex.js

/**
 * Returns an object with {fromIndex, toIndex} for a specific from / to
 * @param {array} x
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 */

function arrayGetFromToIndex(x) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let {
    fromIndex,
    toIndex,
    from,
    to
  } = options;

  if (fromIndex === undefined) {
    if (from !== undefined) {
      fromIndex = arrayFindClosestIndex(x, from);
    } else {
      fromIndex = 0;
    }
  }

  if (toIndex === undefined) {
    if (to !== undefined) {
      toIndex = arrayFindClosestIndex(x, to);
    } else {
      toIndex = x.length - 1;
    }
  }

  return {
    fromIndex,
    toIndex
  };
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/xy/xyCheck.js
const isAnyArray = __webpack_require__(0);
/**
 * Throw an error in no an object of x,y arrays
 * @param {object} [points={}]
 */


function xyCheck() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!isAnyArray(points.x) || !isAnyArray(points.y)) {
    throw new Error('Points must be an object of x and y arrays');
  }

  if (points.x.length !== points.y.length) {
    throw new Error('The x and y arrays mush have the same length');
  }
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/xy/xyIntegration.js


/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {number} Integration value on the specified range
 */

function xyIntegration() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  xyCheck(points);
  const {
    x,
    y
  } = points;
  if (x.length < 2) return 0;
  const {
    fromIndex,
    toIndex
  } = arrayGetFromToIndex(x, options);
  let integration = 0;

  for (let i = fromIndex; i < toIndex; i++) {
    integration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
  }

  return integration;
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/xy/xyIntegral.js


/**
 * Generate a X / Y of the integral
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {{x:[],y:[]}} A object with the integration function
 */

function xyIntegral() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  xyCheck(points);
  const {
    x,
    y
  } = points;
  if (x.length < 2) return 0;
  const {
    fromIndex,
    toIndex
  } = arrayGetFromToIndex(x, options);
  let integral = {
    x: [x[fromIndex]],
    y: [0]
  };
  let integration = 0;

  for (let i = fromIndex; i < toIndex; i++) {
    integration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
    integral.x.push(x[i + 1]);
    integral.y.push(integration);
  }

  return integral;
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/xy/xyMaxY.js


/**
 * Finds the max value in a zone
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {number} Max y on the specified range
 */

function xyMaxY() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  xyCheck(points);
  const {
    x,
    y
  } = points;
  if (x.length < 2) return 0;
  const {
    fromIndex,
    toIndex
  } = arrayGetFromToIndex(x, options);
  let maxY = y[fromIndex];

  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > maxY) maxY = y[i];
  }

  return maxY;
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/xy/xyMaxYPoint.js


/**
 * Finds the max y value in a range and return a {x,y} point
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {object}
 */

function xyMaxYPoint() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  xyCheck(points);
  const {
    x,
    y
  } = points;
  if (x.length < 2) return 0;
  const {
    fromIndex,
    toIndex
  } = arrayGetFromToIndex(x, options);
  let current = {
    x: x[fromIndex],
    y: y[fromIndex]
  };

  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > current.y) current = {
      x: x[i],
      y: y[i]
    };
  }

  return current;
}
// CONCATENATED MODULE: ./node_modules/ml-spectra-processing/src/index.js
/* concated harmony reexport arrayFindClosestIndex */__webpack_require__.d(__webpack_exports__, "arrayFindClosestIndex", function() { return arrayFindClosestIndex; });
/* concated harmony reexport arrayGetFromToIndex */__webpack_require__.d(__webpack_exports__, "arrayGetFromToIndex", function() { return arrayGetFromToIndex; });
/* concated harmony reexport xyIntegration */__webpack_require__.d(__webpack_exports__, "xyIntegration", function() { return xyIntegration; });
/* concated harmony reexport xyIntegral */__webpack_require__.d(__webpack_exports__, "xyIntegral", function() { return xyIntegral; });
/* concated harmony reexport xyCheck */__webpack_require__.d(__webpack_exports__, "xyCheck", function() { return xyCheck; });
/* concated harmony reexport xyMaxY */__webpack_require__.d(__webpack_exports__, "xyMaxY", function() { return xyMaxY; });
/* concated harmony reexport xyMaxYPoint */__webpack_require__.d(__webpack_exports__, "xyMaxYPoint", function() { return xyMaxYPoint; });








/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/is-any-array/src/index.js
var src = __webpack_require__(0);
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// CONCATENATED MODULE: ./node_modules/ml-array-sequential-fill/lib-es6/index.js


function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
/**
 * Fill an array with sequential numbers
 * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
 * @param {object} [options={}]
 * @param {number} [options.from=0] - first value in the array
 * @param {number} [options.to=10] - last value in the array
 * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
 * @param {number} [options.step] - if not provided calculated from size
 * @return {Array<number>}
 */


function sequentialFill() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_typeof(input) === 'object' && !src_default()(input)) {
    options = input;
    input = [];
  }

  if (!src_default()(input)) {
    throw new TypeError('input must be an array');
  }

  var _options = options,
      _options$from = _options.from,
      from = _options$from === void 0 ? 0 : _options$from,
      _options$to = _options.to,
      to = _options$to === void 0 ? 10 : _options$to,
      _options$size = _options.size,
      size = _options$size === void 0 ? input.length : _options$size,
      step = _options.step;

  if (size && step) {
    throw new Error('step is defined by the array size');
  }

  if (!size) {
    if (step) {
      size = Math.floor((to - from) / step) + 1;
    } else {
      size = to - from + 1;
    }
  }

  if (!step && size) {
    step = (to - from) / (size - 1);
  }

  if (Array.isArray(input)) {
    input.length = 0; // only works with normal array

    for (var i = 0; i < size; i++) {
      input.push(from);
      from += step;
    }
  } else {
    if (input.length !== size) {
      throw new Error('sequentialFill typed array must have the correct length');
    }

    for (var _i = 0; _i < size; _i++) {
      input[_i] = from;
      from += step;
    }
  }

  return input;
}

/* harmony default export */ var lib_es6 = (sequentialFill);
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/integral.js
/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 * @param {number} x0
 * @param {number} x1
 * @param {number} slope
 * @param {number} intercept
 * @return {number} integral value.
 */
function integral(x0, x1, slope, intercept) {
  return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/equallySpacedSmooth.js

/**
 * function that retrieves the getEquallySpacedData with the variant "smooth"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "smooth"
 */

function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
  var xLength = x.length;
  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var output = new Array(numberOfPoints);
  var initialOriginalStep = x[1] - x[0];
  var lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

  var min = from - halfStep;
  var max = from + halfStep;
  var previousX = Number.MIN_VALUE;
  var previousY = 0;
  var nextX = x[0] - initialOriginalStep;
  var nextY = 0;
  var currentValue = 0;
  var slope = 0;
  var intercept = 0;
  var sumAtMin = 0;
  var sumAtMax = 0;
  var i = 0; // index of input

  var j = 0; // index of output

  function getSlope(x0, y0, x1, y1) {
    return (y1 - y0) / (x1 - x0);
  }

  main: while (true) {
    if (previousX <= min && min <= nextX) {
      add = integral(0, min - previousX, slope, previousY);
      sumAtMin = currentValue + add;
    }

    while (nextX - max >= 0) {
      // no overlap with original point, just consume current value
      var add = integral(0, max - previousX, slope, previousY);
      sumAtMax = currentValue + add;
      output[j++] = (sumAtMax - sumAtMin) / step;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      sumAtMin = sumAtMax;
    }

    currentValue += integral(previousX, nextX, slope, intercept);
    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else if (i === xLength) {
      nextX += lastOriginalStep;
      nextY = 0;
    }

    slope = getSlope(previousX, previousY, nextX, nextY);
    intercept = -slope * previousX + previousY;
  }

  return output;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/equallySpacedSlot.js
/**
 * function that retrieves the getEquallySpacedData with the variant "slot"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "slot"
 */
function equallySpacedSlot(x, y, from, to, numberOfPoints) {
  var xLength = x.length;
  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var lastStep = x[x.length - 1] - x[x.length - 2];
  var start = from - halfStep;
  var output = new Array(numberOfPoints); // Init main variables

  var min = start;
  var max = start + step;
  var previousX = -Number.MAX_VALUE;
  var previousY = 0;
  var nextX = x[0];
  var nextY = y[0];
  var frontOutsideSpectra = 0;
  var backOutsideSpectra = true;
  var currentValue = 0; // for slot algorithm

  var currentPoints = 0;
  var i = 1; // index of input

  var j = 0; // index of output

  main: while (true) {
    if (previousX >= nextX) throw new Error('x must be an increasing serie');

    while (previousX - max > 0) {
      // no overlap with original point, just consume current value
      if (backOutsideSpectra) {
        currentPoints++;
        backOutsideSpectra = false;
      }

      output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
      j++;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      currentValue = 0;
      currentPoints = 0;
    }

    if (previousX > min) {
      currentValue += previousY;
      currentPoints++;
    }

    if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
      currentPoints--;
    }

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else {
      nextX += lastStep;
      nextY = 0;
      frontOutsideSpectra++;
    }
  }

  return output;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/getZones.js
function getZones(from, to, numberOfPoints) {
  let exclusions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (from > to) {
    [from, to] = [to, from];
  } // in exclusions from and to have to be defined


  exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
  exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

  exclusions.forEach(exclusion => {
    if (exclusion.from > exclusion.to) {
      [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
    }
  });
  exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

  exclusions.forEach(exclusion => {
    if (exclusion.from < from) exclusion.from = from;
    if (exclusion.to > to) exclusion.to = to;
  });

  for (let i = 0; i < exclusions.length - 1; i++) {
    if (exclusions[i].to > exclusions[i + 1].from) {
      exclusions[i].to = exclusions[i + 1].from;
    }
  }

  exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

  if (!exclusions || exclusions.length === 0) {
    return [{
      from,
      to,
      numberOfPoints
    }];
  } // need to deal with overlapping exclusions and out of bound exclusions


  let toRemove = exclusions.reduce((previous, exclusion) => previous += exclusion.to - exclusion.from, 0);
  let total = to - from;
  let unitsPerPoint = (total - toRemove) / numberOfPoints;
  let zones = [];
  let currentFrom = from;
  let totalPoints = 0;

  for (let exclusion of exclusions) {
    let currentNbPoints = Math.round((exclusion.from - currentFrom) / unitsPerPoint);
    totalPoints += currentNbPoints;

    if (currentNbPoints > 0) {
      zones.push({
        from: currentFrom,
        to: exclusion.from,
        numberOfPoints: currentNbPoints
      });
    }

    currentFrom = exclusion.to;
  }

  if (numberOfPoints - totalPoints > 0) {
    zones.push({
      from: currentFrom,
      to: to,
      numberOfPoints: numberOfPoints - totalPoints
    });
  }

  return zones;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return equallySpaced; });




/**
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth" - smooth is the default option
 *
 * The slot variant consist that each point in the new array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in the new array.
 *
 * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {string} [options.variant='smooth']
 * @param {number} [options.numberOfPoints=100]
 * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
 * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
 */

function equallySpaced() {
  let arrayXY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let {
    x,
    y
  } = arrayXY;
  let xLength = x.length;
  let reverse = false;

  if (x.length > 1 && x[0] > x[1]) {
    x = x.slice().reverse();
    y = y.slice().reverse();
    reverse = true;
  }

  let {
    from = x[0],
    to = x[xLength - 1],
    variant = 'smooth',
    numberOfPoints = 100,
    exclusions = []
  } = options;

  if (xLength !== y.length) {
    throw new RangeError("the x and y vector doesn't have the same size.");
  }

  if (typeof from !== 'number' || isNaN(from)) {
    throw new RangeError("'from' option must be a number");
  }

  if (typeof to !== 'number' || isNaN(to)) {
    throw new RangeError("'to' option must be a number");
  }

  if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
    throw new RangeError("'numberOfPoints' option must be a number");
  }

  let zones = getZones(from, to, numberOfPoints, exclusions);
  let xResult = [];
  let yResult = [];

  for (let zone of zones) {
    let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant, reverse);
    xResult.push(...zoneResult.x);
    yResult.push(...zoneResult.y);
  }

  if (reverse) {
    if (from < to) {
      return {
        x: xResult.reverse(),
        y: yResult.reverse()
      };
    } else {
      return {
        x: xResult,
        y: yResult
      };
    }
  } else {
    if (from < to) {
      return {
        x: xResult,
        y: yResult
      };
    } else {
      return {
        x: xResult.reverse(),
        y: yResult.reverse()
      };
    }
  }
}

function processZone(x, y, from, to, numberOfPoints, variant) {
  if (numberOfPoints < 1) {
    throw new RangeError('the number of points must be at least 1');
  }

  var output = variant === 'slot' ? equallySpacedSlot(x, y, from, to, numberOfPoints) : equallySpacedSmooth(x, y, from, to, numberOfPoints);
  return {
    x: lib_es6({
      from,
      to,
      size: numberOfPoints
    }),
    y: output
  };
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-array-xy-filter-x/src/getZones.js
function getZones(from, to) {
  let exclusions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (from > to) {
    [from, to] = [to, from];
  } // in exclusions from and to have to be defined


  exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
  exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

  exclusions.forEach(exclusion => {
    if (exclusion.from > exclusion.to) {
      [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
    }
  });
  exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

  exclusions.forEach(exclusion => {
    if (exclusion.from < from) exclusion.from = from;
    if (exclusion.to > to) exclusion.to = to;
  });

  for (let i = 0; i < exclusions.length - 1; i++) {
    if (exclusions[i].to > exclusions[i + 1].from) {
      exclusions[i].to = exclusions[i + 1].from;
    }
  }

  exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

  if (!exclusions || exclusions.length === 0) {
    return [{
      from,
      to
    }];
  }

  let zones = [];
  let currentFrom = from;

  for (let exclusion of exclusions) {
    if (currentFrom < exclusion.from) {
      zones.push({
        from: currentFrom,
        to: exclusion.from
      });
    }

    currentFrom = exclusion.to;
  }

  if (currentFrom < to) {
    zones.push({
      from: currentFrom,
      to: to
    });
  }

  return zones;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-filter-x/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return filterX; });

/**
 * Filter an array x/y based on various criteria
 * x points are expected to be sorted
 *
 * @param {object} points
 * @param {object} [options={}]
 * @param {array} [options.from]
 * @param {array} [options.to]
 * @param {array} [options.exclusions=[]]
 * @return {{x: Array<number>, y: Array<number>}}
 */

function filterX(points) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    x,
    y
  } = points;
  const {
    from = x[0],
    to = x[x.length - 1],
    exclusions = []
  } = options;
  let zones = getZones(from, to, exclusions);
  let currentZoneIndex = 0;
  let newX = [];
  let newY = [];
  let position = 0;

  while (position < x.length) {
    if (x[position] <= zones[currentZoneIndex].to && x[position] >= zones[currentZoneIndex].from) {
      newX.push(x[position]);
      newY.push(y[position]);
    } else {
      if (x[position] > zones[currentZoneIndex].to) {
        currentZoneIndex++;
        if (!zones[currentZoneIndex]) break;
      }
    }

    position++;
  }

  return {
    x: newX,
    y: newY
  };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=spectra-processor.js.map