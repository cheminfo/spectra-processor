/**
 * spectra-processor
 * @version v0.17.0
 * @link https://github.com/cheminfo/spectra-processor#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.spectraProcessor = {}));
}(this, function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  const toString = Object.prototype.toString;

  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  var src = isAnyArray;

  var lib = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function createCommonjsModule(fn, module) {
      return module = {
        exports: {}
      }, fn(module, module.exports), module.exports;
    }

    var array = createCommonjsModule(function (module, exports) {
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
    });
    var array_1 = array.sum;
    var array_2 = array.max;
    var array_3 = array.min;
    var array_4 = array.minMax;
    var array_5 = array.arithmeticMean;
    var array_6 = array.mean;
    var array_7 = array.geometricMean;
    var array_8 = array.logMean;
    var array_9 = array.grandMean;
    var array_10 = array.truncatedMean;
    var array_11 = array.harmonicMean;
    var array_12 = array.contraHarmonicMean;
    var array_13 = array.median;
    var array_14 = array.variance;
    var array_15 = array.standardDeviation;
    var array_16 = array.standardError;
    var array_17 = array.robustMeanAndStdev;
    var array_18 = array.quartiles;
    var array_19 = array.pooledStandardDeviation;
    var array_20 = array.pooledVariance;
    var array_21 = array.mode;
    var array_22 = array.covariance;
    var array_23 = array.skewness;
    var array_24 = array.kurtosis;
    var array_25 = array.entropy;
    var array_26 = array.weightedMean;
    var array_27 = array.weightedStandardDeviation;
    var array_28 = array.weightedVariance;
    var array_29 = array.center;
    var array_30 = array.standardize;
    var array_31 = array.cumulativeSum;

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
    /**
     *
     * @private
     * @param {Spectrum} spectrum
     * @param {object} [filter={}]
     * @param {array} [filter.from]
     * @param {array} [filter.to]
     * @param {array} [filter.exclusions=[]]
     */


    function getData(spectrum) {
      let filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let data = {
        x: spectrum.x,
        y: spectrum.y
      };

      if (filter) {
        data = filterX({
          x: spectrum.x,
          y: spectrum.y
        }, filter);
      }

      return data;
    }

    const toString = Object.prototype.toString;

    function isAnyArray(object) {
      return toString.call(object).endsWith('Array]');
    }

    var src$1 = isAnyArray;

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

      if (_typeof(input) === 'object' && !src$1(input)) {
        options = input;
        input = [];
      }

      if (!src$1(input)) {
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

    function getZones$1(from, to, numberOfPoints) {
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

      if (numberOfPoints < 2) {
        throw new RangeError("'numberOfPoints' option must be greater than 1");
      }

      let zones = getZones$1(from, to, numberOfPoints, exclusions);
      let xResult = [];
      let yResult = [];

      for (let zone of zones) {
        let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant);
        xResult = xResult.concat(zoneResult.x);
        yResult = yResult.concat(zoneResult.y);
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
        x: sequentialFill({
          from,
          to,
          size: numberOfPoints
        }),
        y: output
      };
    }
    /**
     * Computes the maximum of the given values
     * @param {Array<number>} input
     * @return {number}
     */


    function max(input) {
      if (!src$1(input)) {
        throw new TypeError('input must be an array');
      }

      if (input.length === 0) {
        throw new TypeError('input must not be empty');
      }

      var maxValue = input[0];

      for (var i = 1; i < input.length; i++) {
        if (input[i] > maxValue) maxValue = input[i];
      }

      return maxValue;
    }
    /**
     * Computes the mean of the given values
     * @param {Array<number>} input
     * @return {number}
     */


    function sum(input) {
      if (!src$1(input)) {
        throw new TypeError('input must be an array');
      }

      if (input.length === 0) {
        throw new TypeError('input must not be empty');
      }

      var sumValue = 0;

      for (var i = 0; i < input.length; i++) {
        sumValue += input[i];
      }

      return sumValue;
    }
    /**
     * Computes the norm of the given values
     * @param {Array<number>} input
     * @param {object} [options={}]
     * @param {string} [options.algorithm='absolute'] absolute, sum or max
     * @return {number}
     */


    function norm(input) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$algorithm = options.algorithm,
          algorithm = _options$algorithm === void 0 ? 'absolute' : _options$algorithm;

      if (!Array.isArray(input)) {
        throw new Error('input must be an array');
      }

      if (input.length === 0) {
        throw new Error('input must not be empty');
      }

      switch (algorithm.toLowerCase()) {
        case 'absolute':
          {
            var absoluteSumValue = absoluteSum(input);
            if (absoluteSumValue === 0) return input.slice(0);
            return input.map(function (element) {
              return element / absoluteSumValue;
            });
          }

        case 'max':
          {
            var maxValue = max(input);
            if (maxValue === 0) return input.slice(0);
            return input.map(function (element) {
              return element / maxValue;
            });
          }

        case 'sum':
          {
            var sumValue = sum(input);
            if (sumValue === 0) return input.slice(0);
            return input.map(function (element) {
              return element / sumValue;
            });
          }

        default:
          throw new Error("norm: unknown algorithm: ".concat(algorithm));
      }
    }

    function absoluteSum(input) {
      var sumValue = 0;

      for (var i = 0; i < input.length; i++) {
        sumValue += Math.abs(input[i]);
      }

      return sumValue;
    }
    /**
     * Computes the minimum of the given values
     * @param {Array<number>} input
     * @return {number}
     */


    function min(input) {
      if (!src$1(input)) {
        throw new TypeError('input must be an array');
      }

      if (input.length === 0) {
        throw new TypeError('input must not be empty');
      }

      var minValue = input[0];

      for (var i = 1; i < input.length; i++) {
        if (input[i] < minValue) minValue = input[i];
      }

      return minValue;
    }

    function rescale(input) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!src$1(input)) {
        throw new TypeError('input must be an array');
      } else if (input.length === 0) {
        throw new TypeError('input must not be empty');
      }

      var output;

      if (options.output !== undefined) {
        if (!src$1(options.output)) {
          throw new TypeError('output option must be an array if specified');
        }

        output = options.output;
      } else {
        output = new Array(input.length);
      }

      var currentMin = min(input);
      var currentMax = max(input);

      if (currentMin === currentMax) {
        throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
      }

      var _options$min = options.min,
          minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
          _options$max = options.max,
          maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

      if (minValue >= maxValue) {
        throw new RangeError('min option must be smaller than max option');
      }

      var factor = (maxValue - minValue) / (currentMax - currentMin);

      for (var i = 0; i < input.length; i++) {
        output[i] = (input[i] - currentMin) * factor + minValue;
      }

      return output;
    }
    /**
     *
     * @private
     * @param {*} spectrum
     * @param {*} options
     */


    function getNormalized(spectrum) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Array.isArray(spectrum.x) || !Array.isArray(spectrum.y)) {
        throw new Error('getNormalized: Can not get normalized data, missing original data.');
      }

      let {
        from = spectrum.x[0],
        to = spectrum.x[spectrum.x.length - 1],
        numberOfPoints = 1024,
        filters = [],
        exclusions = []
      } = options;
      let y = spectrum.y.slice(0);

      for (let filter of filters) {
        switch (filter.name) {
          case 'centerMean':
            {
              let mean = array.mean(spectrum.y);

              let meanFct = y => y - mean;

              y = y.map(meanFct);
              break;
            }

          case 'scaleSD':
            {
              let std = array.standardDeviation(spectrum.y);

              let stdFct = y => y / std;

              y = y.map(stdFct);
              break;
            }

          case 'normalize':
            {
              y = norm(y);
              break;
            }

          case 'rescale':
            {
              y = rescale(y);
              break;
            }

          case '':
          case undefined:
            break;

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
      return result;
    }
    /**
     * Throw an error in no an object of x,y arrays
     * @param {object} [points={}]
     */


    function check() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!src(points.x) || !src(points.y)) {
        throw new Error('Points must be an object of x and y arrays');
      }

      if (points.x.length !== points.y.length) {
        throw new Error('The x and y arrays mush have the same length');
      }
    }
    /**
     * Returns the closest index of a `target` in an ordered array
     * @param {array} array
     * @param {number} target
     */


    function findClosestIndex(array, target) {
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
    /**
     * Returns an object with {fromIndex, toIndex} for a specific from / to
     * @param {array} x
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     */


    function getFromToIndex(x) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let {
        fromIndex,
        toIndex,
        from,
        to
      } = options;

      if (fromIndex === undefined) {
        if (from !== undefined) {
          fromIndex = findClosestIndex(x, from);
        } else {
          fromIndex = 0;
        }
      }

      if (toIndex === undefined) {
        if (to !== undefined) {
          toIndex = findClosestIndex(x, to);
        } else {
          toIndex = x.length - 1;
        }
      }

      return {
        fromIndex,
        toIndex
      };
    }
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


    function integration() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 2) return 0;
      const {
        fromIndex,
        toIndex
      } = getFromToIndex(x, options);
      let integration = 0;

      for (let i = fromIndex; i < toIndex; i++) {
        integration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
      }

      return integration;
    }
    /**
     * Generate a X / Y of the integral
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.from] - First value for integration in the X scale
     * @param {number} [options.fromIndex=0] - First point for integration
     * @param {number} [options.to] - Last value for integration in the X scale
     * @param {number} [options.toIndex=x.length-1] - Last point for integration
     * @param {boolean} [options.reverse=false] - Integrate from the larger value to the smallest value
     * @return {{x:[],y:[]}} An object with the integration function
     */


    function integral$1() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        reverse = false
      } = options;
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 2) return 0;
      const {
        fromIndex,
        toIndex
      } = getFromToIndex(x, options);
      let integration = 0;
      let integral;

      if (reverse) {
        integral = {
          x: [x[toIndex]],
          y: [0]
        };

        for (let i = toIndex; i > fromIndex; i--) {
          integration += (x[i] - x[i - 1]) * (y[i - 1] + y[i]) / 2;
          integral.x.push(x[i - 1]);
          integral.y.push(integration);
        }

        integral.x.reverse();
        integral.y.reverse();
      } else {
        integral = {
          x: [x[fromIndex]],
          y: [0]
        };

        for (let i = fromIndex; i < toIndex; i++) {
          integration += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
          integral.x.push(x[i + 1]);
          integral.y.push(integration);
        }
      }

      return integral;
    }
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


    function maxY() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 2) return 0;
      const {
        fromIndex,
        toIndex
      } = getFromToIndex(x, options);
      let maxY = y[fromIndex];

      for (let i = fromIndex; i <= toIndex; i++) {
        if (y[i] > maxY) maxY = y[i];
      }

      return maxY;
    }
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


    function maxYPoint() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 2) return 0;
      const {
        fromIndex,
        toIndex
      } = getFromToIndex(x, options);
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


    function minYPoint() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 2) return 0;
      const {
        fromIndex,
        toIndex
      } = getFromToIndex(x, options);
      let current = {
        x: x[fromIndex],
        y: y[fromIndex]
      };

      for (let i = fromIndex; i <= toIndex; i++) {
        if (y[i] < current.y) current = {
          x: x[i],
          y: y[i]
        };
      }

      return current;
    }
    /**
     * Reduce the number of points while keeping the same noise. Practical to
     * display many spectra as SVG
     * @param {array} x
     * @param {array} y
     * @param {object} [options={}]
     * @param {number} [from=x[0]]
     * @param {number} [to=x[x.length-1]]
     * @param {number} [nbPoints=4001] Number of points
     */


    function reduce(x, y) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let {
        from = x[0],
        to = x[x.length - 1],
        nbPoints = 4000
      } = options;
      let fromIndex = findClosestIndex(x, from);
      let toIndex = findClosestIndex(x, to);
      if (fromIndex > 0 && x[fromIndex] > from) fromIndex--;
      if (toIndex < x.length - 1 && x[toIndex] < to) toIndex++;

      if (toIndex - fromIndex < nbPoints) {
        return {
          x: x.slice(fromIndex, toIndex + 1),
          y: y.slice(fromIndex, toIndex + 1)
        };
      }

      let newX = [x[fromIndex]];
      let newY = [y[fromIndex]];
      let minY = Number.MAX_VALUE;
      let maxY = Number.MIN_VALUE;

      if (nbPoints % 2 === 0) {
        nbPoints = nbPoints / 2 + 1;
      } else {
        nbPoints = (nbPoints - 1) / 2 + 1;
      }

      let slot = (x[toIndex] - x[fromIndex]) / (nbPoints - 1);
      let currentX = x[fromIndex] + slot;
      let first = true;

      for (let i = fromIndex + 1; i <= toIndex; i++) {
        if (first) {
          minY = y[i];
          maxY = y[i];
          first = false;
        } else {
          if (y[i] < minY) minY = y[i];
          if (y[i] > maxY) maxY = y[i];
        }

        if (x[i] >= currentX || i === toIndex) {
          newX.push(currentX - slot / 2);
          newY.push(minY);
          newX.push(currentX);
          newY.push(maxY);
          currentX += slot;
          first = true;
        }
      } // we will need to make some kind of min / max because there are too many points
      // we will always keep the first point and the last point


      return {
        x: newX,
        y: newY
      };
    }
    /**
     * Sort object of array, x has to be monotone.
     * @param {object} data Object of kind {x:[], re:[], im:[]}.
     * @return {SD}
     */


    function sortX(data) {
      const {
        x,
        y
      } = data;

      if (x.length !== y.length) {
        throw TypeError('sortX: length of x and y must be identical');
      }

      if (x.length < 2 || x[0] < x[1]) return data;
      return {
        x: x.slice(0).reverse(),
        y: y.slice(0).reverse()
      };
    }
    /**
     * Find the closest minimum going down hill
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @return {{x,y,xIndex}} An object with the x/y value
     */


    function minClosestYPoint(points) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      let {
        target,
        targetIndex
      } = options;

      if (targetIndex === undefined) {
        if (target !== undefined) {
          targetIndex = findClosestIndex(x, target);
        } else {
          targetIndex = 0;
        }
      }

      let previousIndex = Number.MIN_SAFE_INTEGER;
      let currentIndex = targetIndex;
      let minY = y[targetIndex];

      while (currentIndex !== previousIndex) {
        previousIndex = currentIndex;

        if (currentIndex > 0 && y[currentIndex - 1] < minY) {
          currentIndex--;
        } else if (currentIndex < x.length - 1 && y[currentIndex + 1] < minY) {
          currentIndex++;
        }

        minY = y[currentIndex];
      }

      return {
        x: x[currentIndex],
        y: y[currentIndex],
        index: currentIndex
      };
    }
    /**
     * Find the closest maximum going up hill
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @return {{x,y,xIndex}} An object with the x/y value
     */


    function maxClosestYPoint(points) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      let {
        target,
        targetIndex
      } = options;

      if (targetIndex === undefined) {
        if (target !== undefined) {
          targetIndex = findClosestIndex(x, target);
        } else {
          targetIndex = 0;
        }
      }

      let previousIndex = Number.MIN_SAFE_INTEGER;
      let currentIndex = targetIndex;
      let maxY = y[targetIndex];

      while (currentIndex !== previousIndex) {
        previousIndex = currentIndex;

        if (currentIndex > 0 && y[currentIndex - 1] > maxY) {
          currentIndex--;
        } else if (currentIndex < x.length - 1 && y[currentIndex + 1] > maxY) {
          currentIndex++;
        }

        maxY = y[currentIndex];
      }

      return {
        x: x[currentIndex],
        y: y[currentIndex],
        index: currentIndex
      };
    }
    /**
     *  Returns the targetIndex
     * @param {array} [x]
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @param {number}
     */


    function getTargetIndex(x) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let {
        target,
        targetIndex
      } = options;

      if (targetIndex === undefined) {
        if (target !== undefined) {
          return findClosestIndex(x, target);
        } else {
          return 0;
        }
      }

      return targetIndex;
    }

    function realMinYPoint(points) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      const targetIndex = getTargetIndex(x, options); // interpolation to a sin() function

      if (y[targetIndex - 1] < 0 && y[targetIndex + 1] < 0 && y[targetIndex] <= y[targetIndex - 1] && y[targetIndex] <= y[targetIndex + 1]) {
        let alpha = 20 * Math.log10(-y[targetIndex - 1]);
        let beta = 20 * Math.log10(-y[targetIndex]);
        let gamma = 20 * Math.log10(-y[targetIndex + 1]);
        let p = 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma);
        return {
          x: x[targetIndex] + (x[targetIndex] - x[targetIndex - 1]) * p,
          y: y[targetIndex] - 0.25 * (y[targetIndex - 1] - y[targetIndex + 1]) * p,
          index: targetIndex
        };
      } else {
        return {
          x: x[targetIndex],
          y: y[targetIndex],
          index: targetIndex
        };
      }
    }
    /**
     * Find the closest minimum going down hill
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex=0]
     * @return {{x,y,xIndex}} An object with the x/y value
     */


    function realMaxYPoint(points) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      const targetIndex = getTargetIndex(x, options); // interpolation to a sin() function

      if (y[targetIndex - 1] > 0 && y[targetIndex + 1] > 0 && y[targetIndex] >= y[targetIndex - 1] && y[targetIndex] >= y[targetIndex + 1]) {
        let alpha = 20 * Math.log10(y[targetIndex - 1]);
        let beta = 20 * Math.log10(y[targetIndex]);
        let gamma = 20 * Math.log10(y[targetIndex + 1]);
        let p = 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma);
        return {
          x: x[targetIndex] + (x[targetIndex] - x[targetIndex - 1]) * p,
          y: y[targetIndex] - 0.25 * (y[targetIndex - 1] - y[targetIndex + 1]) * p,
          index: targetIndex
        };
      } else {
        return {
          x: x[targetIndex],
          y: y[targetIndex],
          index: targetIndex
        };
      }
    }
    /**
     * Finds all the max values
     * If the values are equal the middle
     * of the equal part will be the position of the signal!
     *
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @return {Array} Array of points
     */


    function maximaY() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 3) return [];
      let maxima = [];
      let startEqualIndex = -1;

      for (let i = 1; i < x.length - 1; i++) {
        if (y[i - 1] < y[i] && y[i + 1] < y[i]) {
          maxima.push({
            x: x[i],
            y: y[i],
            index: i
          });
        } else if (y[i - 1] < y[i] && y[i + 1] === y[i]) {
          startEqualIndex = i;
        } else if (y[i - 1] === y[i] && y[i + 1] < y[i]) {
          let index = (i + startEqualIndex) / 2 >> 0;
          maxima.push({
            x: x[index],
            y: y[index],
            index
          });
        }
      }

      return maxima;
    }
    /**
     * Finds all the min values
     * If the values are equal the middle
     * of the equal part will be the position of the signal!
     *
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @return {Array} Array of points
     */


    function minimaY() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 3) return [];
      let maxima = [];
      let startEqualIndex = -1;

      for (let i = 1; i < x.length - 1; i++) {
        if (y[i - 1] > y[i] && y[i + 1] > y[i]) {
          maxima.push({
            x: x[i],
            y: y[i],
            index: i
          });
        } else if (y[i - 1] > y[i] && y[i + 1] === y[i]) {
          startEqualIndex = i;
        } else if (y[i - 1] === y[i] && y[i + 1] > y[i]) {
          let index = (i + startEqualIndex) / 2 >> 0;
          maxima.push({
            x: x[index],
            y: y[index],
            index
          });
        }
      }

      return maxima;
    }
    /**
     * Returns an information about a signal
     *
     * We expect ordered data and equidistant X axis
     * You can use the method helper if required:
     * ML.ArrayXY.uniqueX
     * ML.ArrayXY.sortX
     * ML.ArrayXY.equallySpaced
     *
     * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
     * @param {object} [options={}]
     * @param {number} [options.target]
     * @param {number} [options.targetIndex]
     * @return {object} Information about signal
     */


    function peakInfo() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      check(points);
      const {
        x,
        y
      } = points;
      if (x.length < 3) return undefined;
      let {
        targetIndex,
        target
      } = options;

      if (targetIndex === undefined) {
        if (target !== undefined) {
          targetIndex = findClosestIndex(x, target);
        }
      }

      if (targetIndex === undefined) {
        throw new Error('peakInfo: need to specify target or targetIndex');
      }

      let i = targetIndex;
      let currentDiff = y[i] - y[i + 1];
      let multiplier = currentDiff < 0 ? -1 : 1;
      currentDiff *= multiplier;

      while (i < x.length - 1) {
        i++;
        let newDiff = (y[i] - y[i + 1]) * multiplier;
        if (newDiff < currentDiff) break;
        currentDiff = newDiff;
      }

      let after = {
        x: x[i],
        y: y[i]
      };
      i = targetIndex;
      currentDiff = (y[i] - y[i - 1]) * multiplier;

      while (i > 1) {
        i--;
        let newDiff = (y[i] - y[i - 1]) * multiplier;
        if (newDiff < currentDiff) break;
        currentDiff = newDiff;
      }

      let before = {
        x: x[i],
        y: y[i]
      };
      return {
        inflectionBefore: before,
        inflectionAfter: after,
        extrema: {
          x: x[targetIndex],
          y: y[targetIndex]
        },
        inflectionMiddle: {
          x: (before.x + after.x) / 2,
          y: (before.y + after.y) / 2
        },
        width: Math.abs(before.x - after.x)
      };
    }

    const XY = {
      check,
      integral: integral$1,
      integration,
      maxY,
      maximaY,
      maxYPoint,
      minimaY,
      minYPoint,
      reduce,
      sortX,
      minClosestYPoint,
      maxClosestYPoint,
      realMaxYPoint,
      realMinYPoint,
      peakInfo
    };
    /**
    
    /**
     * This function add the first array by the second array or a constant value to each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Array}
     */

    function add(array1, array2) {
      let isConstant = false;
      let constant;

      if (Array.isArray(array2)) {
        if (array1.length !== array2.length) {
          throw new Error('sub: size of array1 and array2 must be identical');
        }
      } else {
        isConstant = true;
        constant = Number(array2);
      }

      let array3 = new Array(array1.length);

      if (isConstant) {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] + constant;
        }
      } else {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] + array2[i];
        }
      }

      return array3;
    }
    /**
     * This function subtract the first array by the second array or a constant value from each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @return {object}
     */


    function boxPlot(array) {
      array = array.slice(0).sort((a, b) => a - b);

      if (array.length < 5) {
        throw Error('boxPlot: can not calculate info if array contains less than 3 elements');
      }

      let info = {
        Q1: 0.0,
        Q2: 0.0,
        Q3: 0.0,
        min: array[0],
        max: array[array.length - 1]
      };
      let q1max, q3min;

      if (array.length % 2 === 1) {
        // odd
        let middle = (array.length - 1) / 2;
        info.Q2 = array[middle];
        q1max = middle - 1;
        q3min = middle + 1;
      } else {
        // even
        q3min = array.length / 2;
        q1max = q3min - 1;
        info.Q2 = (array[q1max] + array[q3min]) / 2;
      }

      if (q1max % 2 === 0) {
        info.Q1 = array[q1max / 2];
        info.Q3 = array[(array.length + q3min - 1) / 2];
      } else {
        info.Q1 = (array[(q1max + 1) / 2] + array[(q1max - 1) / 2]) / 2;
        let middleOver = (array.length + q3min) / 2;
        info.Q3 = (array[middleOver] + array[middleOver - 1]) / 2;
      }

      return info;
    }
    /**
    
    /**
     * This function divide the first array by the second array or a constant value to each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Array}
     */


    function divide(array1, array2) {
      let isConstant = false;
      let constant;

      if (Array.isArray(array2)) {
        if (array1.length !== array2.length) {
          throw new Error('sub: size of array1 and array2 must be identical');
        }
      } else {
        isConstant = true;
        constant = Number(array2);
      }

      let array3 = new Array(array1.length);

      if (isConstant) {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] / constant;
        }
      } else {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] / array2[i];
        }
      }

      return array3;
    }
    /**
    
    /**
     * This function multiply the first array by the second array or a constant value to each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Array}
     */


    function multiply(array1, array2) {
      let isConstant = false;
      let constant;

      if (Array.isArray(array2)) {
        if (array1.length !== array2.length) {
          throw new Error('sub: size of array1 and array2 must be identical');
        }
      } else {
        isConstant = true;
        constant = Number(array2);
      }

      let array3 = new Array(array1.length);

      if (isConstant) {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] * constant;
        }
      } else {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] * array2[i];
        }
      }

      return array3;
    }
    /**
     * This function performs a circular shift to a new array
     * Positive values of shifts will shift to the right and negative values will do to the left
     * @example rotate([1,2,3,4],1) -> [4,1,2,3]
     * @example rotate([1,2,3,4],-1) -> [2,3,4,1]
     * @param {Array} array - the array that will be rotated
     * @param {number} shift
     * @return {Array}
     */


    function rotate(array, shift) {
      shift = shift % array.length;
      if (shift < 0) shift += array.length;
      return array.slice(array.length - shift).concat(array.slice(0, array.length - shift));
    }
    /**
     * This function subtract the first array by the second array or a constant value from each element of the first array
     * @param {Array} array1 - the array that will be rotated
     * @param {Array|Number} array2
     * @return {Array}
     */


    function subtract(array1, array2) {
      let isConstant = false;
      let constant;

      if (Array.isArray(array2)) {
        if (array1.length !== array2.length) {
          throw new Error('sub: size of array1 and array2 must be identical');
        }
      } else {
        isConstant = true;
        constant = Number(array2);
      }

      let array3 = new Array(array1.length);

      if (isConstant) {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] - constant;
        }
      } else {
        for (let i = 0; i < array1.length; i++) {
          array3[i] = array1[i] - array2[i];
        }
      }

      return array3;
    }
    /**
    
    /**
     * Calculates the correlation between 2 vectors
     * https://en.wikipedia.org/wiki/Correlation_and_dependence
     *
     * @param {Array} [A] - the array that will be rotated
     * @param {Array} [B]
     * @return {Array}
     */


    function correlation(A, B) {
      let n = A.length;
      let sumA = 0;
      let sumA2 = 0;
      let sumB = 0;
      let sumB2 = 0;
      let sumAB = 0;

      for (let i = 0; i < n; i++) {
        let a = A[i];
        let b = B[i];
        sumA += a;
        sumA2 += a ** 2;
        sumB += b;
        sumB2 += b ** 2;
        sumAB += a * b;
      }

      return (n * sumAB - sumA * sumB) / (Math.sqrt(n * sumA2 - sumA ** 2) * Math.sqrt(n * sumB2 - sumB ** 2));
    }

    const X = {
      add,
      boxPlot,
      divide,
      findClosestIndex,
      getTargetIndex,
      multiply,
      rotate,
      subtract,
      correlation
    };
    /**
     *  @private
     * @param {*} spectrum
     * @param {*} ranges
     */

    function updateRangesInfo(spectrum) {
      let ranges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      spectrum.ranges = {};

      for (let range of ranges) {
        range = JSON.parse(JSON.stringify(range));
        spectrum.ranges[range.label] = range;
        let fromToIndex = {
          fromIndex: X.findClosestIndex(spectrum.normalized.x, range.from),
          toIndex: X.findClosestIndex(spectrum.normalized.x, range.to)
        };
        range.integration = XY.integration(spectrum.normalized, fromToIndex);
        range.maxPoint = XY.maxYPoint(spectrum.normalized, fromToIndex);
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
      /**
       *
       * @param {array} x
       * @param {array} y
       * @param {string} id
       * @param {object} [options={}]
       * @param {object} [options.meta={}]
       * @param {object} [options.normalization]
       * @param {object} [options.normalized]
       */
      constructor(x, y, id) {
        let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        const {
          meta = {},
          normalization = {},
          normalized
        } = options;

        if (x && x.length > 1 && x[0] > x[1]) {
          this.x = x.reverse();
          this.y = y.reverse();
        } else {
          this.x = x || [];
          this.y = y || [];
        }

        this.id = id;
        this.meta = meta;
        this.normalizedBoundary = {
          x: {
            min: 0,
            max: 0
          },
          y: {
            min: 0,
            max: 0
          }
        };

        if (normalized) {
          this.normalized = normalized;
          this.updateNormalizedBoundary();
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
        let original = (this.x && this.x.length || 0) * 16;
        let normalized = this.normalized.x.length * 16;
        this.memory = {
          original,
          normalized,
          total: original + normalized
        };
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

        return {
          x: this.x,
          y: this.y
        };
      }

    }

    Spectrum.prototype.getData = function (options) {
      return getData(this, options);
    };

    Spectrum.prototype.updateNormalization = function (normalization) {
      this.normalized = getNormalized(this, normalization);
      this.ranges = {};
      this.updateMemory();
      this.updateNormalizedBoundary();
    };

    Spectrum.prototype.updateRangesInfo = function (ranges) {
      updateRangesInfo(this, ranges);
    };

    Spectrum.prototype.updateNormalizedBoundary = function () {
      this.normalizedBoundary.x = {
        min: this.normalized.x[0],
        max: this.normalized.x[this.normalized.x.length - 1]
      };
      this.normalizedBoundary.y = array_4(this.normalized.y);
    };

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

                fastParseXYData(spectrum, dataValue);
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
          } else if (dataLabel === '$REFERENCEPOINT') ;else if (dataLabel === 'VARNAME') {
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

    var src$1$1 = {
      convert: JcampConverter,
      createTree: createTree
    };
    var src_1 = src$1$1.convert;

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
     * Create a spectrum from a jcamp
     * @param {string} jcamp - String containing the JCAMP data
     * @return {Spectrum} - new instance of Spectrum with the provided data
     */

    function jcamp(jcamp) {
      const parsed = src_1(jcamp, {
        xy: true,
        keepRecordsRegExp: /TITLE/
      });
      const kind = getJcampKind(parsed);
      const data = parsed.spectra[0].data[0];
      const meta = parsed.info; // we convert the data

      if (kind && kind.importation && kind.importation.converter) {
        data.y = data.y.map(kind.importation.converter);
      }

      return {
        data,
        kind,
        meta
      };
    }
    /**
     * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
     * @param {object} [points={}] : Object of points contains property x (an array) and y (an array)
     * @return points
     */


    function uniqueX() {
      let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const {
        x,
        y
      } = points;
      if (x.length < 2) return;

      if (x.length !== y.length) {
        throw new Error('The X and Y arrays mush have the same length');
      }

      let current = x[0];
      let counter = 0;

      for (let i = 1; i < x.length; i++) {
        if (current !== x[i]) {
          counter++;
          current = x[i];
          x[counter] = x[i];

          if (i !== counter) {
            y[counter] = 0;
          }
        }

        if (i !== counter) {
          y[counter] += y[i];
        }
      }

      x.length = counter + 1;
      y.length = counter + 1;
    }
    /**
     * Parse a text-file and convert it to an array of XY points
     * @param {string} text - csv or tsv strings
     * @param {object} [options={}]
     * @param {boolean} [options.rescale = false] - will set the maximum value to 1
     * @param {boolean} [options.uniqueX = false] - Make the X values unique (works only with 'xxyy' format). If the X value is repeated the sum of Y is done.
     * @param {number} [options.xColumn = 0] - A number that specifies the x column
     * @param {number} [options.yColumn = 1] - A number that specifies the y column
     * @param {number} [options.maxNumberColumns = (Math.max(xColumn, yColumn)+1)] - A number that specifies the maximum number of y columns
     * @param {number} [options.minNumberColumns = (Math.min(xColumn, yColumn)+1)] - A number that specifies the minimum number of y columns
     * @param {boolean} [options.keepInfo = false] - shoud we keep the non numeric lines. In this case the system will return an object {data, info}
     * @return {object{x:<Array<number>>,y:<Array<number>>}
     */


    function parseXY(text) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let {
        rescale = false,
        uniqueX: uniqueX$1 = false,
        xColumn = 0,
        yColumn = 1,
        keepInfo = false,
        maxNumberColumns = Number.MAX_SAFE_INTEGER,
        minNumberColumns = 2
      } = options;
      maxNumberColumns = Math.max(maxNumberColumns, xColumn + 1, yColumn + 1);
      minNumberColumns = Math.max(xColumn + 1, yColumn + 1, minNumberColumns);
      let lines = text.split(/[\r\n]+/);
      let maxY = Number.MIN_VALUE;
      let result = {
        x: [],
        y: []
      };
      let info = [];

      for (let l = 0; l < lines.length; l++) {
        let line = lines[l].trim(); // we will consider only lines that contains only numbers

        if (line.match(/[0-9]+/) && line.match(/^[0-9eE,;. \t+-]+$/)) {
          let fields = line.split(/,[; \t]+|[; \t]+/);

          if (fields.length === 1) {
            fields = line.split(/[,; \t]+/);
          }

          if (fields && fields.length >= minNumberColumns && fields.length <= maxNumberColumns) {
            let x = parseFloat(fields[xColumn].replace(',', '.'));
            let y = parseFloat(fields[yColumn].replace(',', '.'));
            if (y > maxY) maxY = y;
            result.x.push(x);
            result.y.push(y);
          }
        } else if (line) {
          info.push({
            position: result.x.length,
            value: line
          });
        }
      }

      if (uniqueX$1) {
        uniqueX(result);
      }

      if (rescale) {
        for (let i = 0; i < result.y.length; i++) {
          result.y[i] /= maxY;
        }
      }

      if (!keepInfo) return result;
      return {
        info,
        data: result
      };
    }
    /**
     * Create a spectrum from a text file
     * @param {string} text - String containing the JCAMP data
     * @return {Spectrum} - new instance of Spectrum with the provided data
     */


    function text(text) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        kind,
        parserOptions = {}
      } = options;
      const data = parseXY(text, parserOptions); // we convert the data

      if (kind && kind.importation && kind.importation.converter) {
        data.y = data.y.map(kind.importation.converter);
      }

      return {
        data
      };
    }
    /**
     * Creates a g
     * @param {string} text - String containing the text data
     * @param {object} [options={}]
     * @param {string} [options.fs='\t'] Field separator
     * @return {object} - {matrix, data, x, ids}
     */


    function matrix(text) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const lines = text.split(/[\r\n]+/).filter(value => value);
      const {
        fs = '\t'
      } = options;
      let matrix = [];
      let ids = [];
      let meta = [];
      let x = [];
      let headers = lines[0].split(fs);
      let labels = [];

      for (let i = 0; i < headers.length; i++) {
        let header = headers[i];

        if (isNaN(header)) {
          labels[i] = header;
        } else {
          x = headers.slice(i).map(value => Number(value));
          break;
        }
      }

      for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        let parts = line.split('\t');
        ids.push(parts[0]);
        let oneMeta = {};
        meta.push(oneMeta);

        for (let j = 1; j < parts.length; j++) {
          if (j < labels.length) {
            oneMeta[labels[j]] = parts[j];
          } else {
            matrix.push(parts.slice(labels.length).map(value => Number(value)));
            break;
          }
        }
      }

      return {
        x,
        meta,
        matrix,
        ids
      };
    }

    function getNormalizationAnnotations() {
      let filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let boundary = arguments.length > 1 ? arguments[1] : undefined;
      let {
        exclusions = []
      } = filter;
      let annotations = [];
      exclusions = exclusions.filter(exclusion => !exclusion.ignore);
      annotations = exclusions.map(exclusion => {
        let annotation = {
          type: 'rect',
          position: [{
            x: exclusion.from,
            y: boundary.y.min
          }, {
            x: exclusion.to,
            y: boundary.y.max
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
            y: boundary.y.min
          }, {
            x: filter.from,
            y: boundary.y.max
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
            y: boundary.y.min
          }, {
            x: 10000,
            y: boundary.y.max
          }],
          strokeWidth: 0,
          fillColor: 'rgba(255,255,224,1)'
        });
      }

      return annotations;
    }
    /**
     * @private
     * @param {*} spectra
     */


    function getBoxPlotData(spectra) {
      let matrix = [];
      let x = spectra[0].normalized.x;

      for (let spectrum of spectra) {
        matrix.push(spectrum.normalized.y);
      }

      let nbRow = matrix.length;
      let nbColumn = matrix[0].length;
      let result;
      let aColumn = new Float64Array(nbRow);

      for (let column = 0; column < nbColumn; column++) {
        for (let row = 0; row < nbRow; row++) {
          aColumn[row] = matrix[row][column];
        }

        let info = X.boxPlot(aColumn);

        if (!result) {
          result = {
            x
          };

          for (let key in info) {
            result[key] = [];
          }
        }

        for (let key in info) {
          result[key].push(info[key]);
        }
      }

      return result;
    }

    function getBoxPlotAnnotations(spectra) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        q13FillColor = '#000',
        q13FillOpacity = 0.3,
        q2StrokeColor = '#000',
        q2StrokeWidth = 3,
        minMaxFillColor = '#000',
        minMaxFillOpacity = 0.15
      } = options;
      let annotations = [];
      let data = getBoxPlotData(spectra);

      if (q13FillOpacity && q13FillColor) {
        let q13 = [];

        for (let i = 0; i < data.x.length; i++) {
          q13.push({
            x: data.x[i],
            y: data.Q1[i]
          });
        }

        for (let i = data.x.length - 1; i >= 0; i--) {
          q13.push({
            x: data.x[i],
            y: data.Q3[i]
          });
        }

        annotations.push({
          type: 'polygon',
          layer: 0,
          properties: {
            fillColor: q13FillColor,
            fillOpacity: q13FillOpacity,
            strokeWidth: 0.0000001,
            position: q13
          }
        });
      }

      if (q2StrokeColor && q2StrokeWidth) {
        let q2 = [];

        for (let i = 0; i < data.x.length; i++) {
          q2.push({
            x: data.x[i],
            y: data.Q2[i]
          });
        } // Temp code because polyline is not working


        for (let i = data.x.length - 1; i >= 0; i--) {
          q2.push({
            x: data.x[i],
            y: data.Q2[i]
          });
        }

        annotations.push({
          type: 'polygon',
          layer: 0,
          properties: {
            strokeWidth: q2StrokeWidth,
            strokeColor: q2StrokeColor,
            position: q2
          }
        });
      }

      if (minMaxFillColor && minMaxFillOpacity) {
        let minMax = [];

        for (let i = 0; i < data.x.length; i++) {
          minMax.push({
            x: data.x[i],
            y: data.min[i]
          });
        }

        for (let i = data.x.length - 1; i >= 0; i--) {
          minMax.push({
            x: data.x[i],
            y: data.max[i]
          });
        }

        annotations.push({
          type: 'polygon',
          layer: 0,
          properties: {
            fillColor: minMaxFillColor,
            fillOpacity: minMaxFillOpacity,
            strokeWidth: 0.0000001,
            strokeColor: '#FFF',
            position: minMax
          }
        });
      }

      return annotations;
    }

    function addChartDataStyle(data, spectrum) {
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
    }
    /**
     * Retrieve a chart with selected original data
     * @param {object} [options={}]
     * @param {Array} [options.ids] List of spectra ids, by default all
     * @param {Array} [options.maxDataPoints=]
     */


    function getChart(spectra) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        ids
      } = options;
      let chart = {
        data: []
      };

      for (let spectrum of spectra) {
        if (!ids || ids.includes(spectrum.id)) {
          let data = spectrum.getData();
          addChartDataStyle(data, spectrum);
          chart.data.push(data);
        }
      }

      return chart;
    }
    /**
     * @private
     * @param {*} spectra
     * @param {*} options
     */


    function getNormalizedData(spectra) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        ids
      } = options;
      if (!spectra || !spectra[0]) return {};
      let matrix = [];
      let meta = [];
      let currentIDs = [];

      for (let spectrum of spectra) {
        if (!ids || ids.includes(spectrum.id)) {
          currentIDs.push(spectrum.id);
          matrix.push(spectrum.normalized.y);
          meta.push(spectrum.meta);
        }
      }

      let x = spectra[0].normalized.x;
      return {
        ids: currentIDs,
        matrix,
        meta,
        x
      };
    }

    function getTrackAnnotation(spectra, index) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      const {
        ids
      } = options;
      let annotations = [];
      let normalized = getNormalizedData(spectra, {
        ids
      });
      if (normalized.ids.length === 0) return annotations;
      let line = 0; // header containing X coordinate

      annotations.push({
        type: 'line',
        position: [{
          x: "".concat(70, "px"),
          y: "".concat(15 + 15 * line, "px")
        }, {
          x: "".concat(85, "px"),
          y: "".concat(15 + 15 * line, "px")
        }],
        strokeWidth: 0.0000001,
        label: {
          size: 16,
          text: "x: ".concat(normalized.x[index].toPrecision(6)),
          position: {
            x: "".concat(130, "px"),
            y: "".concat(20 + 15 * line, "px")
          }
        }
      });
      line++;

      for (let i = 0; i < normalized.ids.length; i++) {
        let id = normalized.ids[i];
        let meta = normalized.meta[i];
        let y = normalized.matrix[i][index];
        annotations.push({
          type: 'line',
          position: [{
            x: "".concat(70, "px"),
            y: "".concat(15 + 15 * line, "px")
          }, {
            x: "".concat(85, "px"),
            y: "".concat(15 + 15 * line, "px")
          }],
          strokeColor: meta.color,
          strokeWidth: 2,
          label: {
            text: "".concat(y.toPrecision(4), " - ").concat(id),
            position: {
              x: "".concat(90, "px"),
              y: "".concat(20 + 15 * line, "px")
            }
          }
        });
        line++;
      }

      return annotations;
    }

    function getNormalizedChart(spectra) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        ids
      } = options;
      let chart = {
        data: []
      };

      for (let spectrum of spectra) {
        if (!ids || ids.includes(spectrum.id)) {
          let data = spectrum.normalized;
          addChartDataStyle(data, spectrum);
          chart.data.push(data);
        }
      }

      return chart;
    }
    /**
     *
     * @param {SpectraProcessor} spectraProcessor
     * @param {object} [options={}] scale spectra based on various parameters
     * @param {object} [options.range] from - to
     * @param {Array} [options.ids] ids of selected spectra
     * @param {string} [options.targetID=spectra[0].id]
     * @param {string} [options.method='max'] min, max, range, minMax
     * @param {boolean} [options.relative=false]
     */


    function getScaledChart(spectraProcessor) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let scaled = spectraProcessor.getScaledData(options);
      let chart = {
        data: []
      };

      for (let i = 0; i < scaled.matrix.length; i++) {
        let data = {
          x: scaled.x,
          y: scaled.matrix[i]
        };
        addChartDataStyle(data, {
          meta: scaled.meta[i],
          id: scaled.ids[i]
        });
        chart.data.push(data);
      }

      return chart;
    }
    /**
     * @private
     */


    function getAutocorrelation(normalized, index) {
      let matrix = normalized.matrix;
      let nbRow = matrix.length;
      let nbColumn = matrix[0].length;
      let array1 = new Float64Array(nbRow);
      let array2 = new Float64Array(nbRow);
      let result = new Array(nbColumn);

      for (let j = 0; j < nbRow; j++) {
        array1[j] = matrix[j][index];
      }

      for (let i = 0; i < nbColumn; i++) {
        for (let j = 0; j < nbRow; j++) {
          array2[j] = matrix[j][i];
        }

        result[i] = X.correlation(array1, array2);
      }

      return {
        x: normalized.x,
        y: result
      };
    }
    /**
     * @private
     * Check that a row index is not out of bounds
     * @param {Matrix} matrix
     * @param {number} index
     * @param {boolean} [outer]
     */


    function checkRowIndex(matrix, index, outer) {
      let max = outer ? matrix.rows : matrix.rows - 1;

      if (index < 0 || index > max) {
        throw new RangeError('Row index out of range');
      }
    }
    /**
     * @private
     * Check that a column index is not out of bounds
     * @param {Matrix} matrix
     * @param {number} index
     * @param {boolean} [outer]
     */


    function checkColumnIndex(matrix, index, outer) {
      let max = outer ? matrix.columns : matrix.columns - 1;

      if (index < 0 || index > max) {
        throw new RangeError('Column index out of range');
      }
    }
    /**
     * @private
     * Check that the provided vector is an array with the right length
     * @param {Matrix} matrix
     * @param {Array|Matrix} vector
     * @return {Array}
     * @throws {RangeError}
     */


    function checkRowVector(matrix, vector) {
      if (vector.to1DArray) {
        vector = vector.to1DArray();
      }

      if (vector.length !== matrix.columns) {
        throw new RangeError('vector size must be the same as the number of columns');
      }

      return vector;
    }
    /**
     * @private
     * Check that the provided vector is an array with the right length
     * @param {Matrix} matrix
     * @param {Array|Matrix} vector
     * @return {Array}
     * @throws {RangeError}
     */


    function checkColumnVector(matrix, vector) {
      if (vector.to1DArray) {
        vector = vector.to1DArray();
      }

      if (vector.length !== matrix.rows) {
        throw new RangeError('vector size must be the same as the number of rows');
      }

      return vector;
    }

    function checkIndices(matrix, rowIndices, columnIndices) {
      return {
        row: checkRowIndices(matrix, rowIndices),
        column: checkColumnIndices(matrix, columnIndices)
      };
    }

    function checkRowIndices(matrix, rowIndices) {
      if (typeof rowIndices !== 'object') {
        throw new TypeError('unexpected type for row indices');
      }

      let rowOut = rowIndices.some(r => {
        return r < 0 || r >= matrix.rows;
      });

      if (rowOut) {
        throw new RangeError('row indices are out of range');
      }

      if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
      return rowIndices;
    }

    function checkColumnIndices(matrix, columnIndices) {
      if (typeof columnIndices !== 'object') {
        throw new TypeError('unexpected type for column indices');
      }

      let columnOut = columnIndices.some(c => {
        return c < 0 || c >= matrix.columns;
      });

      if (columnOut) {
        throw new RangeError('column indices are out of range');
      }

      if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
      return columnIndices;
    }

    function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
      if (arguments.length !== 5) {
        throw new RangeError('expected 4 arguments');
      }

      checkNumber('startRow', startRow);
      checkNumber('endRow', endRow);
      checkNumber('startColumn', startColumn);
      checkNumber('endColumn', endColumn);

      if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
        throw new RangeError('Submatrix indices are out of range');
      }
    }

    function newArray(length) {
      let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let array = [];

      for (let i = 0; i < length; i++) {
        array.push(value);
      }

      return array;
    }

    function checkNumber(name, value) {
      if (typeof value !== 'number') {
        throw new TypeError("".concat(name, " must be a number"));
      }
    }

    function sumByRow(matrix) {
      let sum = newArray(matrix.rows);

      for (let i = 0; i < matrix.rows; ++i) {
        for (let j = 0; j < matrix.columns; ++j) {
          sum[i] += matrix.get(i, j);
        }
      }

      return sum;
    }

    function sumByColumn(matrix) {
      let sum = newArray(matrix.columns);

      for (let i = 0; i < matrix.rows; ++i) {
        for (let j = 0; j < matrix.columns; ++j) {
          sum[j] += matrix.get(i, j);
        }
      }

      return sum;
    }

    function sumAll(matrix) {
      let v = 0;

      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          v += matrix.get(i, j);
        }
      }

      return v;
    }

    function productByRow(matrix) {
      let sum = newArray(matrix.rows, 1);

      for (let i = 0; i < matrix.rows; ++i) {
        for (let j = 0; j < matrix.columns; ++j) {
          sum[i] *= matrix.get(i, j);
        }
      }

      return sum;
    }

    function productByColumn(matrix) {
      let sum = newArray(matrix.columns, 1);

      for (let i = 0; i < matrix.rows; ++i) {
        for (let j = 0; j < matrix.columns; ++j) {
          sum[j] *= matrix.get(i, j);
        }
      }

      return sum;
    }

    function productAll(matrix) {
      let v = 1;

      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          v *= matrix.get(i, j);
        }
      }

      return v;
    }

    function varianceByRow(matrix, unbiased, mean) {
      const rows = matrix.rows;
      const cols = matrix.columns;
      const variance = [];

      for (let i = 0; i < rows; i++) {
        let sum1 = 0;
        let sum2 = 0;
        let x = 0;

        for (let j = 0; j < cols; j++) {
          x = matrix.get(i, j) - mean[i];
          sum1 += x;
          sum2 += x * x;
        }

        if (unbiased) {
          variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
        } else {
          variance.push((sum2 - sum1 * sum1 / cols) / cols);
        }
      }

      return variance;
    }

    function varianceByColumn(matrix, unbiased, mean) {
      const rows = matrix.rows;
      const cols = matrix.columns;
      const variance = [];

      for (let j = 0; j < cols; j++) {
        let sum1 = 0;
        let sum2 = 0;
        let x = 0;

        for (let i = 0; i < rows; i++) {
          x = matrix.get(i, j) - mean[j];
          sum1 += x;
          sum2 += x * x;
        }

        if (unbiased) {
          variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
        } else {
          variance.push((sum2 - sum1 * sum1 / rows) / rows);
        }
      }

      return variance;
    }

    function varianceAll(matrix, unbiased, mean) {
      const rows = matrix.rows;
      const cols = matrix.columns;
      const size = rows * cols;
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          x = matrix.get(i, j) - mean;
          sum1 += x;
          sum2 += x * x;
        }
      }

      if (unbiased) {
        return (sum2 - sum1 * sum1 / size) / (size - 1);
      } else {
        return (sum2 - sum1 * sum1 / size) / size;
      }
    }

    function centerByRow(matrix, mean) {
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          matrix.set(i, j, matrix.get(i, j) - mean[i]);
        }
      }
    }

    function centerByColumn(matrix, mean) {
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          matrix.set(i, j, matrix.get(i, j) - mean[j]);
        }
      }
    }

    function centerAll(matrix, mean) {
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          matrix.set(i, j, matrix.get(i, j) - mean);
        }
      }
    }

    function getScaleByRow(matrix) {
      const scale = [];

      for (let i = 0; i < matrix.rows; i++) {
        let sum = 0;

        for (let j = 0; j < matrix.columns; j++) {
          sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
        }

        scale.push(Math.sqrt(sum));
      }

      return scale;
    }

    function scaleByRow(matrix, scale) {
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          matrix.set(i, j, matrix.get(i, j) / scale[i]);
        }
      }
    }

    function getScaleByColumn(matrix) {
      const scale = [];

      for (let j = 0; j < matrix.columns; j++) {
        let sum = 0;

        for (let i = 0; i < matrix.rows; i++) {
          sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
        }

        scale.push(Math.sqrt(sum));
      }

      return scale;
    }

    function scaleByColumn(matrix, scale) {
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          matrix.set(i, j, matrix.get(i, j) / scale[j]);
        }
      }
    }

    function getScaleAll(matrix) {
      const divider = matrix.size - 1;
      let sum = 0;

      for (let j = 0; j < matrix.columns; j++) {
        for (let i = 0; i < matrix.rows; i++) {
          sum += Math.pow(matrix.get(i, j), 2) / divider;
        }
      }

      return Math.sqrt(sum);
    }

    function scaleAll(matrix, scale) {
      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          matrix.set(i, j, matrix.get(i, j) / scale);
        }
      }
    }

    function inspectMatrix() {
      const indent = ' '.repeat(2);
      const indentData = ' '.repeat(4);
      return "".concat(this.constructor.name, " {\n").concat(indent, "[\n").concat(indentData).concat(inspectData(this, indentData), "\n").concat(indent, "]\n").concat(indent, "rows: ").concat(this.rows, "\n").concat(indent, "columns: ").concat(this.columns, "\n}");
    }

    const maxRows = 15;
    const maxColumns = 10;
    const maxNumSize = 8;

    function inspectData(matrix, indent) {
      const {
        rows,
        columns
      } = matrix;
      const maxI = Math.min(rows, maxRows);
      const maxJ = Math.min(columns, maxColumns);
      const result = [];

      for (let i = 0; i < maxI; i++) {
        let line = [];

        for (let j = 0; j < maxJ; j++) {
          line.push(formatNumber(matrix.get(i, j)));
        }

        result.push("".concat(line.join(' ')));
      }

      if (maxJ !== columns) {
        result[result.length - 1] += " ... ".concat(columns - maxColumns, " more columns");
      }

      if (maxI !== rows) {
        result.push("... ".concat(rows - maxRows, " more rows"));
      }

      return result.join("\n".concat(indent));
    }

    function formatNumber(num) {
      const numStr = String(num);

      if (numStr.length <= maxNumSize) {
        return numStr.padEnd(maxNumSize, ' ');
      }

      const precise = num.toPrecision(maxNumSize - 2);

      if (precise.length <= maxNumSize) {
        return precise;
      }

      const exponential = num.toExponential(maxNumSize - 2);
      const eIndex = exponential.indexOf('e');
      const e = exponential.substring(eIndex);
      return exponential.substring(0, maxNumSize - e.length) + e;
    }

    function installMathOperations(AbstractMatrix, Matrix) {
      AbstractMatrix.prototype.add = function add(value) {
        if (typeof value === 'number') return this.addS(value);
        return this.addM(value);
      };

      AbstractMatrix.prototype.addS = function addS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.addM = function addM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.add = function add(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.add(value);
      };

      AbstractMatrix.prototype.sub = function sub(value) {
        if (typeof value === 'number') return this.subS(value);
        return this.subM(value);
      };

      AbstractMatrix.prototype.subS = function subS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.subM = function subM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.sub = function sub(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.sub(value);
      };

      AbstractMatrix.prototype.subtract = AbstractMatrix.prototype.sub;
      AbstractMatrix.prototype.subtractS = AbstractMatrix.prototype.subS;
      AbstractMatrix.prototype.subtractM = AbstractMatrix.prototype.subM;
      AbstractMatrix.subtract = AbstractMatrix.sub;

      AbstractMatrix.prototype.mul = function mul(value) {
        if (typeof value === 'number') return this.mulS(value);
        return this.mulM(value);
      };

      AbstractMatrix.prototype.mulS = function mulS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.mulM = function mulM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.mul = function mul(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.mul(value);
      };

      AbstractMatrix.prototype.multiply = AbstractMatrix.prototype.mul;
      AbstractMatrix.prototype.multiplyS = AbstractMatrix.prototype.mulS;
      AbstractMatrix.prototype.multiplyM = AbstractMatrix.prototype.mulM;
      AbstractMatrix.multiply = AbstractMatrix.mul;

      AbstractMatrix.prototype.div = function div(value) {
        if (typeof value === 'number') return this.divS(value);
        return this.divM(value);
      };

      AbstractMatrix.prototype.divS = function divS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.divM = function divM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.div = function div(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.div(value);
      };

      AbstractMatrix.prototype.divide = AbstractMatrix.prototype.div;
      AbstractMatrix.prototype.divideS = AbstractMatrix.prototype.divS;
      AbstractMatrix.prototype.divideM = AbstractMatrix.prototype.divM;
      AbstractMatrix.divide = AbstractMatrix.div;

      AbstractMatrix.prototype.mod = function mod(value) {
        if (typeof value === 'number') return this.modS(value);
        return this.modM(value);
      };

      AbstractMatrix.prototype.modS = function modS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) % value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.modM = function modM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) % matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.mod = function mod(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.mod(value);
      };

      AbstractMatrix.prototype.modulus = AbstractMatrix.prototype.mod;
      AbstractMatrix.prototype.modulusS = AbstractMatrix.prototype.modS;
      AbstractMatrix.prototype.modulusM = AbstractMatrix.prototype.modM;
      AbstractMatrix.modulus = AbstractMatrix.mod;

      AbstractMatrix.prototype.and = function and(value) {
        if (typeof value === 'number') return this.andS(value);
        return this.andM(value);
      };

      AbstractMatrix.prototype.andS = function andS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) & value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.andM = function andM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) & matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.and = function and(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.and(value);
      };

      AbstractMatrix.prototype.or = function or(value) {
        if (typeof value === 'number') return this.orS(value);
        return this.orM(value);
      };

      AbstractMatrix.prototype.orS = function orS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) | value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.orM = function orM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) | matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.or = function or(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.or(value);
      };

      AbstractMatrix.prototype.xor = function xor(value) {
        if (typeof value === 'number') return this.xorS(value);
        return this.xorM(value);
      };

      AbstractMatrix.prototype.xorS = function xorS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) ^ value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.xorM = function xorM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.xor = function xor(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.xor(value);
      };

      AbstractMatrix.prototype.leftShift = function leftShift(value) {
        if (typeof value === 'number') return this.leftShiftS(value);
        return this.leftShiftM(value);
      };

      AbstractMatrix.prototype.leftShiftS = function leftShiftS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) << value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.leftShiftM = function leftShiftM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) << matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.leftShift = function leftShift(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.leftShift(value);
      };

      AbstractMatrix.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
        if (typeof value === 'number') return this.signPropagatingRightShiftS(value);
        return this.signPropagatingRightShiftM(value);
      };

      AbstractMatrix.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >> value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >> matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.signPropagatingRightShift(value);
      };

      AbstractMatrix.prototype.rightShift = function rightShift(value) {
        if (typeof value === 'number') return this.rightShiftS(value);
        return this.rightShiftM(value);
      };

      AbstractMatrix.prototype.rightShiftS = function rightShiftS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >>> value);
          }
        }

        return this;
      };

      AbstractMatrix.prototype.rightShiftM = function rightShiftM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.rightShift = function rightShift(matrix, value) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.rightShift(value);
      };

      AbstractMatrix.prototype.zeroFillRightShift = AbstractMatrix.prototype.rightShift;
      AbstractMatrix.prototype.zeroFillRightShiftS = AbstractMatrix.prototype.rightShiftS;
      AbstractMatrix.prototype.zeroFillRightShiftM = AbstractMatrix.prototype.rightShiftM;
      AbstractMatrix.zeroFillRightShift = AbstractMatrix.rightShift;

      AbstractMatrix.prototype.not = function not() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, ~this.get(i, j));
          }
        }

        return this;
      };

      AbstractMatrix.not = function not(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.not();
      };

      AbstractMatrix.prototype.abs = function abs() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.abs(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.abs = function abs(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.abs();
      };

      AbstractMatrix.prototype.acos = function acos() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.acos(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.acos = function acos(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.acos();
      };

      AbstractMatrix.prototype.acosh = function acosh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.acosh(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.acosh = function acosh(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.acosh();
      };

      AbstractMatrix.prototype.asin = function asin() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.asin(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.asin = function asin(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.asin();
      };

      AbstractMatrix.prototype.asinh = function asinh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.asinh(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.asinh = function asinh(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.asinh();
      };

      AbstractMatrix.prototype.atan = function atan() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.atan(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.atan = function atan(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.atan();
      };

      AbstractMatrix.prototype.atanh = function atanh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.atanh(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.atanh = function atanh(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.atanh();
      };

      AbstractMatrix.prototype.cbrt = function cbrt() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.cbrt(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.cbrt = function cbrt(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.cbrt();
      };

      AbstractMatrix.prototype.ceil = function ceil() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.ceil(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.ceil = function ceil(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.ceil();
      };

      AbstractMatrix.prototype.clz32 = function clz32() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.clz32(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.clz32 = function clz32(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.clz32();
      };

      AbstractMatrix.prototype.cos = function cos() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.cos(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.cos = function cos(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.cos();
      };

      AbstractMatrix.prototype.cosh = function cosh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.cosh(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.cosh = function cosh(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.cosh();
      };

      AbstractMatrix.prototype.exp = function exp() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.exp(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.exp = function exp(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.exp();
      };

      AbstractMatrix.prototype.expm1 = function expm1() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.expm1(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.expm1 = function expm1(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.expm1();
      };

      AbstractMatrix.prototype.floor = function floor() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.floor(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.floor = function floor(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.floor();
      };

      AbstractMatrix.prototype.fround = function fround() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.fround(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.fround = function fround(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.fround();
      };

      AbstractMatrix.prototype.log = function log() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.log = function log(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.log();
      };

      AbstractMatrix.prototype.log1p = function log1p() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log1p(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.log1p = function log1p(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.log1p();
      };

      AbstractMatrix.prototype.log10 = function log10() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log10(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.log10 = function log10(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.log10();
      };

      AbstractMatrix.prototype.log2 = function log2() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.log2(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.log2 = function log2(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.log2();
      };

      AbstractMatrix.prototype.round = function round() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.round(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.round = function round(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.round();
      };

      AbstractMatrix.prototype.sign = function sign() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sign(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.sign = function sign(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.sign();
      };

      AbstractMatrix.prototype.sin = function sin() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sin(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.sin = function sin(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.sin();
      };

      AbstractMatrix.prototype.sinh = function sinh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sinh(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.sinh = function sinh(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.sinh();
      };

      AbstractMatrix.prototype.sqrt = function sqrt() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.sqrt(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.sqrt = function sqrt(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.sqrt();
      };

      AbstractMatrix.prototype.tan = function tan() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.tan(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.tan = function tan(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.tan();
      };

      AbstractMatrix.prototype.tanh = function tanh() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.tanh(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.tanh = function tanh(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.tanh();
      };

      AbstractMatrix.prototype.trunc = function trunc() {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.trunc(this.get(i, j)));
          }
        }

        return this;
      };

      AbstractMatrix.trunc = function trunc(matrix) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.trunc();
      };

      AbstractMatrix.pow = function pow(matrix, arg0) {
        const newMatrix = new Matrix(matrix);
        return newMatrix.pow(arg0);
      };

      AbstractMatrix.prototype.pow = function pow(value) {
        if (typeof value === 'number') return this.powS(value);
        return this.powM(value);
      };

      AbstractMatrix.prototype.powS = function powS(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.pow(this.get(i, j), value));
          }
        }

        return this;
      };

      AbstractMatrix.prototype.powM = function powM(matrix) {
        matrix = Matrix.checkMatrix(matrix);

        if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
          throw new RangeError('Matrices dimensions must be equal');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
          }
        }

        return this;
      };
    }

    class AbstractMatrix {
      static from1DArray(newRows, newColumns, newData) {
        let length = newRows * newColumns;

        if (length !== newData.length) {
          throw new RangeError('data length does not match given dimensions');
        }

        let newMatrix = new Matrix(newRows, newColumns);

        for (let row = 0; row < newRows; row++) {
          for (let column = 0; column < newColumns; column++) {
            newMatrix.set(row, column, newData[row * newColumns + column]);
          }
        }

        return newMatrix;
      }

      static rowVector(newData) {
        let vector = new Matrix(1, newData.length);

        for (let i = 0; i < newData.length; i++) {
          vector.set(0, i, newData[i]);
        }

        return vector;
      }

      static columnVector(newData) {
        let vector = new Matrix(newData.length, 1);

        for (let i = 0; i < newData.length; i++) {
          vector.set(i, 0, newData[i]);
        }

        return vector;
      }

      static zeros(rows, columns) {
        return new Matrix(rows, columns);
      }

      static ones(rows, columns) {
        return new Matrix(rows, columns).fill(1);
      }

      static rand(rows, columns) {
        let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          random = Math.random
        } = options;
        let matrix = new Matrix(rows, columns);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            matrix.set(i, j, random());
          }
        }

        return matrix;
      }

      static randInt(rows, columns) {
        let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          min = 0,
          max = 1000,
          random = Math.random
        } = options;
        if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
        if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
        if (min >= max) throw new RangeError('min must be smaller than max');
        let interval = max - min;
        let matrix = new Matrix(rows, columns);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            let value = min + Math.round(random() * interval);
            matrix.set(i, j, value);
          }
        }

        return matrix;
      }

      static eye(rows, columns, value) {
        if (columns === undefined) columns = rows;
        if (value === undefined) value = 1;
        let min = Math.min(rows, columns);
        let matrix = this.zeros(rows, columns);

        for (let i = 0; i < min; i++) {
          matrix.set(i, i, value);
        }

        return matrix;
      }

      static diag(data, rows, columns) {
        let l = data.length;
        if (rows === undefined) rows = l;
        if (columns === undefined) columns = rows;
        let min = Math.min(l, rows, columns);
        let matrix = this.zeros(rows, columns);

        for (let i = 0; i < min; i++) {
          matrix.set(i, i, data[i]);
        }

        return matrix;
      }

      static min(matrix1, matrix2) {
        matrix1 = this.checkMatrix(matrix1);
        matrix2 = this.checkMatrix(matrix2);
        let rows = matrix1.rows;
        let columns = matrix1.columns;
        let result = new Matrix(rows, columns);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
          }
        }

        return result;
      }

      static max(matrix1, matrix2) {
        matrix1 = this.checkMatrix(matrix1);
        matrix2 = this.checkMatrix(matrix2);
        let rows = matrix1.rows;
        let columns = matrix1.columns;
        let result = new this(rows, columns);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
          }
        }

        return result;
      }

      static checkMatrix(value) {
        return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
      }

      static isMatrix(value) {
        return value != null && value.klass === 'Matrix';
      }

      get size() {
        return this.rows * this.columns;
      }

      apply(callback) {
        if (typeof callback !== 'function') {
          throw new TypeError('callback must be a function');
        }

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            callback.call(this, i, j);
          }
        }

        return this;
      }

      to1DArray() {
        let array = [];

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            array.push(this.get(i, j));
          }
        }

        return array;
      }

      to2DArray() {
        let copy = [];

        for (let i = 0; i < this.rows; i++) {
          copy.push([]);

          for (let j = 0; j < this.columns; j++) {
            copy[i].push(this.get(i, j));
          }
        }

        return copy;
      }

      toJSON() {
        return this.to2DArray();
      }

      isRowVector() {
        return this.rows === 1;
      }

      isColumnVector() {
        return this.columns === 1;
      }

      isVector() {
        return this.rows === 1 || this.columns === 1;
      }

      isSquare() {
        return this.rows === this.columns;
      }

      isSymmetric() {
        if (this.isSquare()) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j <= i; j++) {
              if (this.get(i, j) !== this.get(j, i)) {
                return false;
              }
            }
          }

          return true;
        }

        return false;
      }

      isEchelonForm() {
        let i = 0;
        let j = 0;
        let previousColumn = -1;
        let isEchelonForm = true;
        let checked = false;

        while (i < this.rows && isEchelonForm) {
          j = 0;
          checked = false;

          while (j < this.columns && checked === false) {
            if (this.get(i, j) === 0) {
              j++;
            } else if (this.get(i, j) === 1 && j > previousColumn) {
              checked = true;
              previousColumn = j;
            } else {
              isEchelonForm = false;
              checked = true;
            }
          }

          i++;
        }

        return isEchelonForm;
      }

      isReducedEchelonForm() {
        let i = 0;
        let j = 0;
        let previousColumn = -1;
        let isReducedEchelonForm = true;
        let checked = false;

        while (i < this.rows && isReducedEchelonForm) {
          j = 0;
          checked = false;

          while (j < this.columns && checked === false) {
            if (this.get(i, j) === 0) {
              j++;
            } else if (this.get(i, j) === 1 && j > previousColumn) {
              checked = true;
              previousColumn = j;
            } else {
              isReducedEchelonForm = false;
              checked = true;
            }
          }

          for (let k = j + 1; k < this.rows; k++) {
            if (this.get(i, k) !== 0) {
              isReducedEchelonForm = false;
            }
          }

          i++;
        }

        return isReducedEchelonForm;
      }

      echelonForm() {
        let result = this.clone();
        let h = 0;
        let k = 0;

        while (h < result.rows && k < result.columns) {
          let iMax = h;

          for (let i = h; i < result.rows; i++) {
            if (result.get(i, k) > result.get(iMax, k)) {
              iMax = i;
            }
          }

          if (result.get(iMax, k) === 0) {
            k++;
          } else {
            result.swapRows(h, iMax);
            let tmp = result.get(h, k);

            for (let j = k; j < result.columns; j++) {
              result.set(h, j, result.get(h, j) / tmp);
            }

            for (let i = h + 1; i < result.rows; i++) {
              let factor = result.get(i, k) / result.get(h, k);
              result.set(i, k, 0);

              for (let j = k + 1; j < result.columns; j++) {
                result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
              }
            }

            h++;
            k++;
          }
        }

        return result;
      }

      reducedEchelonForm() {
        let result = this.echelonForm();
        let m = result.columns;
        let n = result.rows;
        let h = n - 1;

        while (h >= 0) {
          if (result.maxRow(h) === 0) {
            h--;
          } else {
            let p = 0;
            let pivot = false;

            while (p < n && pivot === false) {
              if (result.get(h, p) === 1) {
                pivot = true;
              } else {
                p++;
              }
            }

            for (let i = 0; i < h; i++) {
              let factor = result.get(i, p);

              for (let j = p; j < m; j++) {
                let tmp = result.get(i, j) - factor * result.get(h, j);
                result.set(i, j, tmp);
              }
            }

            h--;
          }
        }

        return result;
      }

      set() {
        throw new Error('set method is unimplemented');
      }

      get() {
        throw new Error('get method is unimplemented');
      }

      repeat() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          rows = 1,
          columns = 1
        } = options;

        if (!Number.isInteger(rows) || rows <= 0) {
          throw new TypeError('rows must be a positive integer');
        }

        if (!Number.isInteger(columns) || columns <= 0) {
          throw new TypeError('columns must be a positive integer');
        }

        let matrix = new Matrix(this.rows * rows, this.columns * columns);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            matrix.setSubMatrix(this, this.rows * i, this.columns * j);
          }
        }

        return matrix;
      }

      fill(value) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, value);
          }
        }

        return this;
      }

      neg() {
        return this.mulS(-1);
      }

      getRow(index) {
        checkRowIndex(this, index);
        let row = [];

        for (let i = 0; i < this.columns; i++) {
          row.push(this.get(index, i));
        }

        return row;
      }

      getRowVector(index) {
        return Matrix.rowVector(this.getRow(index));
      }

      setRow(index, array) {
        checkRowIndex(this, index);
        array = checkRowVector(this, array);

        for (let i = 0; i < this.columns; i++) {
          this.set(index, i, array[i]);
        }

        return this;
      }

      swapRows(row1, row2) {
        checkRowIndex(this, row1);
        checkRowIndex(this, row2);

        for (let i = 0; i < this.columns; i++) {
          let temp = this.get(row1, i);
          this.set(row1, i, this.get(row2, i));
          this.set(row2, i, temp);
        }

        return this;
      }

      getColumn(index) {
        checkColumnIndex(this, index);
        let column = [];

        for (let i = 0; i < this.rows; i++) {
          column.push(this.get(i, index));
        }

        return column;
      }

      getColumnVector(index) {
        return Matrix.columnVector(this.getColumn(index));
      }

      setColumn(index, array) {
        checkColumnIndex(this, index);
        array = checkColumnVector(this, array);

        for (let i = 0; i < this.rows; i++) {
          this.set(i, index, array[i]);
        }

        return this;
      }

      swapColumns(column1, column2) {
        checkColumnIndex(this, column1);
        checkColumnIndex(this, column2);

        for (let i = 0; i < this.rows; i++) {
          let temp = this.get(i, column1);
          this.set(i, column1, this.get(i, column2));
          this.set(i, column2, temp);
        }

        return this;
      }

      addRowVector(vector) {
        vector = checkRowVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + vector[j]);
          }
        }

        return this;
      }

      subRowVector(vector) {
        vector = checkRowVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - vector[j]);
          }
        }

        return this;
      }

      mulRowVector(vector) {
        vector = checkRowVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * vector[j]);
          }
        }

        return this;
      }

      divRowVector(vector) {
        vector = checkRowVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / vector[j]);
          }
        }

        return this;
      }

      addColumnVector(vector) {
        vector = checkColumnVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) + vector[i]);
          }
        }

        return this;
      }

      subColumnVector(vector) {
        vector = checkColumnVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) - vector[i]);
          }
        }

        return this;
      }

      mulColumnVector(vector) {
        vector = checkColumnVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) * vector[i]);
          }
        }

        return this;
      }

      divColumnVector(vector) {
        vector = checkColumnVector(this, vector);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.set(i, j, this.get(i, j) / vector[i]);
          }
        }

        return this;
      }

      mulRow(index, value) {
        checkRowIndex(this, index);

        for (let i = 0; i < this.columns; i++) {
          this.set(index, i, this.get(index, i) * value);
        }

        return this;
      }

      mulColumn(index, value) {
        checkColumnIndex(this, index);

        for (let i = 0; i < this.rows; i++) {
          this.set(i, index, this.get(i, index) * value);
        }

        return this;
      }

      max() {
        let v = this.get(0, 0);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            if (this.get(i, j) > v) {
              v = this.get(i, j);
            }
          }
        }

        return v;
      }

      maxIndex() {
        let v = this.get(0, 0);
        let idx = [0, 0];

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            if (this.get(i, j) > v) {
              v = this.get(i, j);
              idx[0] = i;
              idx[1] = j;
            }
          }
        }

        return idx;
      }

      min() {
        let v = this.get(0, 0);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            if (this.get(i, j) < v) {
              v = this.get(i, j);
            }
          }
        }

        return v;
      }

      minIndex() {
        let v = this.get(0, 0);
        let idx = [0, 0];

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            if (this.get(i, j) < v) {
              v = this.get(i, j);
              idx[0] = i;
              idx[1] = j;
            }
          }
        }

        return idx;
      }

      maxRow(row) {
        checkRowIndex(this, row);
        let v = this.get(row, 0);

        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) > v) {
            v = this.get(row, i);
          }
        }

        return v;
      }

      maxRowIndex(row) {
        checkRowIndex(this, row);
        let v = this.get(row, 0);
        let idx = [row, 0];

        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) > v) {
            v = this.get(row, i);
            idx[1] = i;
          }
        }

        return idx;
      }

      minRow(row) {
        checkRowIndex(this, row);
        let v = this.get(row, 0);

        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) < v) {
            v = this.get(row, i);
          }
        }

        return v;
      }

      minRowIndex(row) {
        checkRowIndex(this, row);
        let v = this.get(row, 0);
        let idx = [row, 0];

        for (let i = 1; i < this.columns; i++) {
          if (this.get(row, i) < v) {
            v = this.get(row, i);
            idx[1] = i;
          }
        }

        return idx;
      }

      maxColumn(column) {
        checkColumnIndex(this, column);
        let v = this.get(0, column);

        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) > v) {
            v = this.get(i, column);
          }
        }

        return v;
      }

      maxColumnIndex(column) {
        checkColumnIndex(this, column);
        let v = this.get(0, column);
        let idx = [0, column];

        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) > v) {
            v = this.get(i, column);
            idx[0] = i;
          }
        }

        return idx;
      }

      minColumn(column) {
        checkColumnIndex(this, column);
        let v = this.get(0, column);

        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) < v) {
            v = this.get(i, column);
          }
        }

        return v;
      }

      minColumnIndex(column) {
        checkColumnIndex(this, column);
        let v = this.get(0, column);
        let idx = [0, column];

        for (let i = 1; i < this.rows; i++) {
          if (this.get(i, column) < v) {
            v = this.get(i, column);
            idx[0] = i;
          }
        }

        return idx;
      }

      diag() {
        let min = Math.min(this.rows, this.columns);
        let diag = [];

        for (let i = 0; i < min; i++) {
          diag.push(this.get(i, i));
        }

        return diag;
      }

      norm() {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'frobenius';
        let result = 0;

        if (type === 'max') {
          return this.max();
        } else if (type === 'frobenius') {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              result = result + this.get(i, j) * this.get(i, j);
            }
          }

          return Math.sqrt(result);
        } else {
          throw new RangeError("unknown norm type: ".concat(type));
        }
      }

      cumulativeSum() {
        let sum = 0;

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            sum += this.get(i, j);
            this.set(i, j, sum);
          }
        }

        return this;
      }

      dot(vector2) {
        if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
        let vector1 = this.to1DArray();

        if (vector1.length !== vector2.length) {
          throw new RangeError('vectors do not have the same size');
        }

        let dot = 0;

        for (let i = 0; i < vector1.length; i++) {
          dot += vector1[i] * vector2[i];
        }

        return dot;
      }

      mmul(other) {
        other = Matrix.checkMatrix(other);
        let m = this.rows;
        let n = this.columns;
        let p = other.columns;
        let result = new Matrix(m, p);
        let Bcolj = new Float64Array(n);

        for (let j = 0; j < p; j++) {
          for (let k = 0; k < n; k++) {
            Bcolj[k] = other.get(k, j);
          }

          for (let i = 0; i < m; i++) {
            let s = 0;

            for (let k = 0; k < n; k++) {
              s += this.get(i, k) * Bcolj[k];
            }

            result.set(i, j, s);
          }
        }

        return result;
      }

      strassen2x2(other) {
        other = Matrix.checkMatrix(other);
        let result = new Matrix(2, 2);
        const a11 = this.get(0, 0);
        const b11 = other.get(0, 0);
        const a12 = this.get(0, 1);
        const b12 = other.get(0, 1);
        const a21 = this.get(1, 0);
        const b21 = other.get(1, 0);
        const a22 = this.get(1, 1);
        const b22 = other.get(1, 1); // Compute intermediate values.

        const m1 = (a11 + a22) * (b11 + b22);
        const m2 = (a21 + a22) * b11;
        const m3 = a11 * (b12 - b22);
        const m4 = a22 * (b21 - b11);
        const m5 = (a11 + a12) * b22;
        const m6 = (a21 - a11) * (b11 + b12);
        const m7 = (a12 - a22) * (b21 + b22); // Combine intermediate values into the output.

        const c00 = m1 + m4 - m5 + m7;
        const c01 = m3 + m5;
        const c10 = m2 + m4;
        const c11 = m1 - m2 + m3 + m6;
        result.set(0, 0, c00);
        result.set(0, 1, c01);
        result.set(1, 0, c10);
        result.set(1, 1, c11);
        return result;
      }

      strassen3x3(other) {
        other = Matrix.checkMatrix(other);
        let result = new Matrix(3, 3);
        const a00 = this.get(0, 0);
        const a01 = this.get(0, 1);
        const a02 = this.get(0, 2);
        const a10 = this.get(1, 0);
        const a11 = this.get(1, 1);
        const a12 = this.get(1, 2);
        const a20 = this.get(2, 0);
        const a21 = this.get(2, 1);
        const a22 = this.get(2, 2);
        const b00 = other.get(0, 0);
        const b01 = other.get(0, 1);
        const b02 = other.get(0, 2);
        const b10 = other.get(1, 0);
        const b11 = other.get(1, 1);
        const b12 = other.get(1, 2);
        const b20 = other.get(2, 0);
        const b21 = other.get(2, 1);
        const b22 = other.get(2, 2);
        const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
        const m2 = (a00 - a10) * (-b01 + b11);
        const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
        const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
        const m5 = (a10 + a11) * (-b00 + b01);
        const m6 = a00 * b00;
        const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
        const m8 = (-a00 + a20) * (b02 - b12);
        const m9 = (a20 + a21) * (-b00 + b02);
        const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
        const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
        const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
        const m13 = (a02 - a22) * (b11 - b21);
        const m14 = a02 * b20;
        const m15 = (a21 + a22) * (-b20 + b21);
        const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
        const m17 = (a02 - a12) * (b12 - b22);
        const m18 = (a11 + a12) * (-b20 + b22);
        const m19 = a01 * b10;
        const m20 = a12 * b21;
        const m21 = a10 * b02;
        const m22 = a20 * b01;
        const m23 = a22 * b22;
        const c00 = m6 + m14 + m19;
        const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
        const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
        const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
        const c11 = m2 + m4 + m5 + m6 + m20;
        const c12 = m14 + m16 + m17 + m18 + m21;
        const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
        const c21 = m12 + m13 + m14 + m15 + m22;
        const c22 = m6 + m7 + m8 + m9 + m23;
        result.set(0, 0, c00);
        result.set(0, 1, c01);
        result.set(0, 2, c02);
        result.set(1, 0, c10);
        result.set(1, 1, c11);
        result.set(1, 2, c12);
        result.set(2, 0, c20);
        result.set(2, 1, c21);
        result.set(2, 2, c22);
        return result;
      }

      mmulStrassen(y) {
        y = Matrix.checkMatrix(y);
        let x = this.clone();
        let r1 = x.rows;
        let c1 = x.columns;
        let r2 = y.rows;
        let c2 = y.columns;

        if (c1 !== r2) {
          // eslint-disable-next-line no-console
          console.warn("Multiplying ".concat(r1, " x ").concat(c1, " and ").concat(r2, " x ").concat(c2, " matrix: dimensions do not match."));
        } // Put a matrix into the top left of a matrix of zeros.
        // `rows` and `cols` are the dimensions of the output matrix.


        function embed(mat, rows, cols) {
          let r = mat.rows;
          let c = mat.columns;

          if (r === rows && c === cols) {
            return mat;
          } else {
            let resultat = AbstractMatrix.zeros(rows, cols);
            resultat = resultat.setSubMatrix(mat, 0, 0);
            return resultat;
          }
        } // Make sure both matrices are the same size.
        // This is exclusively for simplicity:
        // this algorithm can be implemented with matrices of different sizes.


        let r = Math.max(r1, r2);
        let c = Math.max(c1, c2);
        x = embed(x, r, c);
        y = embed(y, r, c); // Our recursive multiplication function.

        function blockMult(a, b, rows, cols) {
          // For small matrices, resort to naive multiplication.
          if (rows <= 512 || cols <= 512) {
            return a.mmul(b); // a is equivalent to this
          } // Apply dynamic padding.


          if (rows % 2 === 1 && cols % 2 === 1) {
            a = embed(a, rows + 1, cols + 1);
            b = embed(b, rows + 1, cols + 1);
          } else if (rows % 2 === 1) {
            a = embed(a, rows + 1, cols);
            b = embed(b, rows + 1, cols);
          } else if (cols % 2 === 1) {
            a = embed(a, rows, cols + 1);
            b = embed(b, rows, cols + 1);
          }

          let halfRows = parseInt(a.rows / 2, 10);
          let halfCols = parseInt(a.columns / 2, 10); // Subdivide input matrices.

          let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
          let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
          let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
          let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
          let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
          let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
          let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
          let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1); // Compute intermediate values.

          let m1 = blockMult(AbstractMatrix.add(a11, a22), AbstractMatrix.add(b11, b22), halfRows, halfCols);
          let m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
          let m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
          let m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
          let m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
          let m6 = blockMult(AbstractMatrix.sub(a21, a11), AbstractMatrix.add(b11, b12), halfRows, halfCols);
          let m7 = blockMult(AbstractMatrix.sub(a12, a22), AbstractMatrix.add(b21, b22), halfRows, halfCols); // Combine intermediate values into the output.

          let c11 = AbstractMatrix.add(m1, m4);
          c11.sub(m5);
          c11.add(m7);
          let c12 = AbstractMatrix.add(m3, m5);
          let c21 = AbstractMatrix.add(m2, m4);
          let c22 = AbstractMatrix.sub(m1, m2);
          c22.add(m3);
          c22.add(m6); // Crop output to the desired size (undo dynamic padding).

          let resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
          resultat = resultat.setSubMatrix(c11, 0, 0);
          resultat = resultat.setSubMatrix(c12, c11.rows, 0);
          resultat = resultat.setSubMatrix(c21, 0, c11.columns);
          resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
          return resultat.subMatrix(0, rows - 1, 0, cols - 1);
        }

        return blockMult(x, y, r, c);
      }

      scaleRows() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          min = 0,
          max = 1
        } = options;
        if (!Number.isFinite(min)) throw new TypeError('min must be a number');
        if (!Number.isFinite(max)) throw new TypeError('max must be a number');
        if (min >= max) throw new RangeError('min must be smaller than max');
        let newMatrix = new Matrix(this.rows, this.columns);

        for (let i = 0; i < this.rows; i++) {
          const row = this.getRow(i);
          rescale(row, {
            min,
            max,
            output: row
          });
          newMatrix.setRow(i, row);
        }

        return newMatrix;
      }

      scaleColumns() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          min = 0,
          max = 1
        } = options;
        if (!Number.isFinite(min)) throw new TypeError('min must be a number');
        if (!Number.isFinite(max)) throw new TypeError('max must be a number');
        if (min >= max) throw new RangeError('min must be smaller than max');
        let newMatrix = new Matrix(this.rows, this.columns);

        for (let i = 0; i < this.columns; i++) {
          const column = this.getColumn(i);
          rescale(column, {
            min: min,
            max: max,
            output: column
          });
          newMatrix.setColumn(i, column);
        }

        return newMatrix;
      }

      flipRows() {
        const middle = Math.ceil(this.columns / 2);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < middle; j++) {
            let first = this.get(i, j);
            let last = this.get(i, this.columns - 1 - j);
            this.set(i, j, last);
            this.set(i, this.columns - 1 - j, first);
          }
        }

        return this;
      }

      flipColumns() {
        const middle = Math.ceil(this.rows / 2);

        for (let j = 0; j < this.columns; j++) {
          for (let i = 0; i < middle; i++) {
            let first = this.get(i, j);
            let last = this.get(this.rows - 1 - i, j);
            this.set(i, j, last);
            this.set(this.rows - 1 - i, j, first);
          }
        }

        return this;
      }

      kroneckerProduct(other) {
        other = Matrix.checkMatrix(other);
        let m = this.rows;
        let n = this.columns;
        let p = other.rows;
        let q = other.columns;
        let result = new Matrix(m * p, n * q);

        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            for (let k = 0; k < p; k++) {
              for (let l = 0; l < q; l++) {
                result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
              }
            }
          }
        }

        return result;
      }

      transpose() {
        let result = new Matrix(this.columns, this.rows);

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            result.set(j, i, this.get(i, j));
          }
        }

        return result;
      }

      sortRows() {
        let compareFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : compareNumbers;

        for (let i = 0; i < this.rows; i++) {
          this.setRow(i, this.getRow(i).sort(compareFunction));
        }

        return this;
      }

      sortColumns() {
        let compareFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : compareNumbers;

        for (let i = 0; i < this.columns; i++) {
          this.setColumn(i, this.getColumn(i).sort(compareFunction));
        }

        return this;
      }

      subMatrix(startRow, endRow, startColumn, endColumn) {
        checkRange(this, startRow, endRow, startColumn, endColumn);
        let newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);

        for (let i = startRow; i <= endRow; i++) {
          for (let j = startColumn; j <= endColumn; j++) {
            newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
          }
        }

        return newMatrix;
      }

      subMatrixRow(indices, startColumn, endColumn) {
        if (startColumn === undefined) startColumn = 0;
        if (endColumn === undefined) endColumn = this.columns - 1;

        if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
          throw new RangeError('Argument out of range');
        }

        let newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);

        for (let i = 0; i < indices.length; i++) {
          for (let j = startColumn; j <= endColumn; j++) {
            if (indices[i] < 0 || indices[i] >= this.rows) {
              throw new RangeError("Row index out of range: ".concat(indices[i]));
            }

            newMatrix.set(i, j - startColumn, this.get(indices[i], j));
          }
        }

        return newMatrix;
      }

      subMatrixColumn(indices, startRow, endRow) {
        if (startRow === undefined) startRow = 0;
        if (endRow === undefined) endRow = this.rows - 1;

        if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
          throw new RangeError('Argument out of range');
        }

        let newMatrix = new Matrix(endRow - startRow + 1, indices.length);

        for (let i = 0; i < indices.length; i++) {
          for (let j = startRow; j <= endRow; j++) {
            if (indices[i] < 0 || indices[i] >= this.columns) {
              throw new RangeError("Column index out of range: ".concat(indices[i]));
            }

            newMatrix.set(j - startRow, i, this.get(j, indices[i]));
          }
        }

        return newMatrix;
      }

      setSubMatrix(matrix, startRow, startColumn) {
        matrix = Matrix.checkMatrix(matrix);
        let endRow = startRow + matrix.rows - 1;
        let endColumn = startColumn + matrix.columns - 1;
        checkRange(this, startRow, endRow, startColumn, endColumn);

        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            this.set(startRow + i, startColumn + j, matrix.get(i, j));
          }
        }

        return this;
      }

      selection(rowIndices, columnIndices) {
        let indices = checkIndices(this, rowIndices, columnIndices);
        let newMatrix = new Matrix(rowIndices.length, columnIndices.length);

        for (let i = 0; i < indices.row.length; i++) {
          let rowIndex = indices.row[i];

          for (let j = 0; j < indices.column.length; j++) {
            let columnIndex = indices.column[j];
            newMatrix.set(i, j, this.get(rowIndex, columnIndex));
          }
        }

        return newMatrix;
      }

      trace() {
        let min = Math.min(this.rows, this.columns);
        let trace = 0;

        for (let i = 0; i < min; i++) {
          trace += this.get(i, i);
        }

        return trace;
      }

      clone() {
        let newMatrix = new Matrix(this.rows, this.columns);

        for (let row = 0; row < this.rows; row++) {
          for (let column = 0; column < this.columns; column++) {
            newMatrix.set(row, column, this.get(row, column));
          }
        }

        return newMatrix;
      }

      sum(by) {
        switch (by) {
          case 'row':
            return sumByRow(this);

          case 'column':
            return sumByColumn(this);

          case undefined:
            return sumAll(this);

          default:
            throw new Error("invalid option: ".concat(by));
        }
      }

      product(by) {
        switch (by) {
          case 'row':
            return productByRow(this);

          case 'column':
            return productByColumn(this);

          case undefined:
            return productAll(this);

          default:
            throw new Error("invalid option: ".concat(by));
        }
      }

      mean(by) {
        const sum = this.sum(by);

        switch (by) {
          case 'row':
            {
              for (let i = 0; i < this.rows; i++) {
                sum[i] /= this.columns;
              }

              return sum;
            }

          case 'column':
            {
              for (let i = 0; i < this.columns; i++) {
                sum[i] /= this.rows;
              }

              return sum;
            }

          case undefined:
            return sum / this.size;

          default:
            throw new Error("invalid option: ".concat(by));
        }
      }

      variance(by) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (typeof by === 'object') {
          options = by;
          by = undefined;
        }

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          unbiased = true,
          mean = this.mean(by)
        } = options;

        if (typeof unbiased !== 'boolean') {
          throw new TypeError('unbiased must be a boolean');
        }

        switch (by) {
          case 'row':
            {
              if (!Array.isArray(mean)) {
                throw new TypeError('mean must be an array');
              }

              return varianceByRow(this, unbiased, mean);
            }

          case 'column':
            {
              if (!Array.isArray(mean)) {
                throw new TypeError('mean must be an array');
              }

              return varianceByColumn(this, unbiased, mean);
            }

          case undefined:
            {
              if (typeof mean !== 'number') {
                throw new TypeError('mean must be a number');
              }

              return varianceAll(this, unbiased, mean);
            }

          default:
            throw new Error("invalid option: ".concat(by));
        }
      }

      standardDeviation(by, options) {
        if (typeof by === 'object') {
          options = by;
          by = undefined;
        }

        const variance = this.variance(by, options);

        if (by === undefined) {
          return Math.sqrt(variance);
        } else {
          for (let i = 0; i < variance.length; i++) {
            variance[i] = Math.sqrt(variance[i]);
          }

          return variance;
        }
      }

      center(by) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (typeof by === 'object') {
          options = by;
          by = undefined;
        }

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        const {
          center = this.mean(by)
        } = options;

        switch (by) {
          case 'row':
            {
              if (!Array.isArray(center)) {
                throw new TypeError('center must be an array');
              }

              centerByRow(this, center);
              return this;
            }

          case 'column':
            {
              if (!Array.isArray(center)) {
                throw new TypeError('center must be an array');
              }

              centerByColumn(this, center);
              return this;
            }

          case undefined:
            {
              if (typeof center !== 'number') {
                throw new TypeError('center must be a number');
              }

              centerAll(this, center);
              return this;
            }

          default:
            throw new Error("invalid option: ".concat(by));
        }
      }

      scale(by) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (typeof by === 'object') {
          options = by;
          by = undefined;
        }

        if (typeof options !== 'object') {
          throw new TypeError('options must be an object');
        }

        let scale = options.scale;

        switch (by) {
          case 'row':
            {
              if (scale === undefined) {
                scale = getScaleByRow(this);
              } else if (!Array.isArray(scale)) {
                throw new TypeError('scale must be an array');
              }

              scaleByRow(this, scale);
              return this;
            }

          case 'column':
            {
              if (scale === undefined) {
                scale = getScaleByColumn(this);
              } else if (!Array.isArray(scale)) {
                throw new TypeError('scale must be an array');
              }

              scaleByColumn(this, scale);
              return this;
            }

          case undefined:
            {
              if (scale === undefined) {
                scale = getScaleAll(this);
              } else if (typeof scale !== 'number') {
                throw new TypeError('scale must be a number');
              }

              scaleAll(this, scale);
              return this;
            }

          default:
            throw new Error("invalid option: ".concat(by));
        }
      }

    }

    AbstractMatrix.prototype.klass = 'Matrix';

    if (typeof Symbol !== 'undefined') {
      AbstractMatrix.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspectMatrix;
    }

    function compareNumbers(a, b) {
      return a - b;
    } // Synonyms


    AbstractMatrix.random = AbstractMatrix.rand;
    AbstractMatrix.randomInt = AbstractMatrix.randInt;
    AbstractMatrix.diagonal = AbstractMatrix.diag;
    AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
    AbstractMatrix.identity = AbstractMatrix.eye;
    AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
    AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;

    class Matrix extends AbstractMatrix {
      constructor(nRows, nColumns) {
        super();

        if (Matrix.isMatrix(nRows)) {
          return nRows.clone();
        } else if (Number.isInteger(nRows) && nRows > 0) {
          // Create an empty matrix
          this.data = [];

          if (Number.isInteger(nColumns) && nColumns > 0) {
            for (let i = 0; i < nRows; i++) {
              this.data.push(new Float64Array(nColumns));
            }
          } else {
            throw new TypeError('nColumns must be a positive integer');
          }
        } else if (Array.isArray(nRows)) {
          // Copy the values from the 2D array
          const arrayData = nRows;
          nRows = arrayData.length;
          nColumns = arrayData[0].length;

          if (typeof nColumns !== 'number' || nColumns === 0) {
            throw new TypeError('Data must be a 2D array with at least one element');
          }

          this.data = [];

          for (let i = 0; i < nRows; i++) {
            if (arrayData[i].length !== nColumns) {
              throw new RangeError('Inconsistent array dimensions');
            }

            this.data.push(Float64Array.from(arrayData[i]));
          }
        } else {
          throw new TypeError('First argument must be a positive number or an array');
        }

        this.rows = nRows;
        this.columns = nColumns;
        return this;
      }

      set(rowIndex, columnIndex, value) {
        this.data[rowIndex][columnIndex] = value;
        return this;
      }

      get(rowIndex, columnIndex) {
        return this.data[rowIndex][columnIndex];
      }

      removeRow(index) {
        checkRowIndex(this, index);

        if (this.rows === 1) {
          throw new RangeError('A matrix cannot have less than one row');
        }

        this.data.splice(index, 1);
        this.rows -= 1;
        return this;
      }

      addRow(index, array) {
        if (array === undefined) {
          array = index;
          index = this.rows;
        }

        checkRowIndex(this, index, true);
        array = Float64Array.from(checkRowVector(this, array));
        this.data.splice(index, 0, array);
        this.rows += 1;
        return this;
      }

      removeColumn(index) {
        checkColumnIndex(this, index);

        if (this.columns === 1) {
          throw new RangeError('A matrix cannot have less than one column');
        }

        for (let i = 0; i < this.rows; i++) {
          const newRow = new Float64Array(this.columns - 1);

          for (let j = 0; j < index; j++) {
            newRow[j] = this.data[i][j];
          }

          for (let j = index + 1; j < this.columns; j++) {
            newRow[j - 1] = this.data[i][j];
          }

          this.data[i] = newRow;
        }

        this.columns -= 1;
        return this;
      }

      addColumn(index, array) {
        if (typeof array === 'undefined') {
          array = index;
          index = this.columns;
        }

        checkColumnIndex(this, index, true);
        array = checkColumnVector(this, array);

        for (let i = 0; i < this.rows; i++) {
          const newRow = new Float64Array(this.columns + 1);
          let j = 0;

          for (; j < index; j++) {
            newRow[j] = this.data[i][j];
          }

          newRow[j++] = array[i];

          for (; j < this.columns + 1; j++) {
            newRow[j] = this.data[i][j - 1];
          }

          this.data[i] = newRow;
        }

        this.columns += 1;
        return this;
      }

    }

    installMathOperations(AbstractMatrix, Matrix);
    /**
     * @private
     */

    function getMeanData(normalized) {
      let matrix = new Matrix(normalized.matrix);
      return {
        x: normalized.x,
        y: matrix.mean('column')
      };
    }
    /**
     * @private
     * @param {*} spectra
     * @param {object} [options={}]
     * @param {string} [options.fs='\t'] field separator
     * @param {string} [options.rs='\n'] record (line) separator
     */


    function getNormalizedText(spectra) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let {
        fs = '\t',
        rs = '\n'
      } = options;
      let {
        matrix,
        meta,
        ids,
        x
      } = getNormalizedData(spectra);
      let allKeysObject = {};

      for (let metum of meta) {
        for (let key of Object.keys(metum)) {
          let type = typeof metum[key];

          if (type === 'number' || type === 'string' || type === 'boolean') {
            allKeysObject[key] = true;
          }
        }
      }

      let allKeys = Object.keys(allKeysObject);
      let lines = [];
      let line = [];
      line.push('id', ...allKeys, ...x);
      lines.push(line.join(fs));

      for (let i = 0; i < ids.length; i++) {
        line = [];
        line.push(ids[i]);

        for (let key of allKeys) {
          line.push(meta[i][key]);
        }

        line.push(...matrix[i]);
        lines.push(line.join(fs));
      }

      return lines.join(rs);
    }

    function getFromToIndex$1(xs, range) {
      let {
        from,
        to
      } = range;

      if (from === undefined) {
        from = xs[0];
      }

      if (to === undefined) {
        to = xs[xs.length - 1];
      }

      return {
        fromIndex: X.findClosestIndex(xs, from),
        toIndex: X.findClosestIndex(xs, to)
      };
    }

    function min$1(spectra, targetSpectrum) {
      let range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let fromToIndex = getFromToIndex$1(targetSpectrum.normalized.x, range);
      let targetValue = XY.minYPoint(targetSpectrum.normalized, fromToIndex).y;
      let values = spectra.map(spectrum => XY.minYPoint(spectrum.normalized, fromToIndex).y);
      let matrix = [];

      for (let i = 0; i < spectra.length; i++) {
        let spectrum = spectra[i];
        let factor = targetValue / values[i];
        matrix.push(X.multiply(spectrum.normalized.y, factor));
      }

      return matrix;
    }

    function max$1(spectra, targetSpectrum) {
      let range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let fromToIndex = getFromToIndex$1(targetSpectrum.normalized.x, range);
      let targetValue = XY.maxYPoint(targetSpectrum.normalized, fromToIndex).y;
      let values = spectra.map(spectrum => XY.maxYPoint(spectrum.normalized, fromToIndex).y);
      let matrix = [];

      for (let i = 0; i < spectra.length; i++) {
        let spectrum = spectra[i];
        let factor = targetValue / values[i];
        matrix.push(X.multiply(spectrum.normalized.y, factor));
      }

      return matrix;
    }

    function maybeToPrecision(value, digits) {
      if (value < 0) {
        value = 0 - value;

        if (typeof digits === 'number') {
          return "- ".concat(value.toPrecision(digits));
        } else {
          return "- ".concat(value.toString());
        }
      } else {
        if (typeof digits === 'number') {
          return value.toPrecision(digits);
        } else {
          return value.toString();
        }
      }
    }

    function checkArraySize(x, y) {
      if (!Array.isArray(x) || !Array.isArray(y)) {
        throw new TypeError('x and y must be arrays');
      }

      if (x.length !== y.length) {
        throw new RangeError('x and y arrays must have the same length');
      }
    }

    class BaseRegression {
      constructor() {
        if (new.target === BaseRegression) {
          throw new Error('BaseRegression must be subclassed');
        }
      }

      predict(x) {
        if (typeof x === 'number') {
          return this._predict(x);
        } else if (Array.isArray(x)) {
          const y = [];

          for (let i = 0; i < x.length; i++) {
            y.push(this._predict(x[i]));
          }

          return y;
        } else {
          throw new TypeError('x must be a number or array');
        }
      }

      _predict() {
        throw new Error('_predict must be implemented');
      }

      train() {// Do nothing for this package
      }

      toString() {
        return '';
      }

      toLaTeX() {
        return '';
      }
      /**
       * Return the correlation coefficient of determination (r) and chi-square.
       * @param {Array<number>} x
       * @param {Array<number>} y
       * @return {object}
       */


      score(x, y) {
        if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) {
          throw new Error('x and y must be arrays of the same length');
        }

        const n = x.length;
        const y2 = new Array(n);

        for (let i = 0; i < n; i++) {
          y2[i] = this._predict(x[i]);
        }

        let xSum = 0;
        let ySum = 0;
        let chi2 = 0;
        let rmsd = 0;
        let xSquared = 0;
        let ySquared = 0;
        let xY = 0;

        for (let i = 0; i < n; i++) {
          xSum += y2[i];
          ySum += y[i];
          xSquared += y2[i] * y2[i];
          ySquared += y[i] * y[i];
          xY += y2[i] * y[i];

          if (y[i] !== 0) {
            chi2 += (y[i] - y2[i]) * (y[i] - y2[i]) / y[i];
          }

          rmsd += (y[i] - y2[i]) * (y[i] - y2[i]);
        }

        const r = (n * xY - xSum * ySum) / Math.sqrt((n * xSquared - xSum * xSum) * (n * ySquared - ySum * ySum));
        return {
          r: r,
          r2: r * r,
          chi2: chi2,
          rmsd: Math.sqrt(rmsd / n)
        };
      }

    }

    class SimpleLinearRegression extends BaseRegression {
      constructor(x, y) {
        super();

        if (x === true) {
          this.slope = y.slope;
          this.intercept = y.intercept;
          this.coefficients = [y.intercept, y.slope];
        } else {
          checkArraySize(x, y);
          regress(this, x, y);
        }
      }

      toJSON() {
        return {
          name: 'simpleLinearRegression',
          slope: this.slope,
          intercept: this.intercept
        };
      }

      _predict(x) {
        return this.slope * x + this.intercept;
      }

      computeX(y) {
        return (y - this.intercept) / this.slope;
      }

      toString(precision) {
        let result = 'f(x) = ';

        if (this.slope !== 0) {
          const xFactor = maybeToPrecision(this.slope, precision);
          result += "".concat(xFactor === '1' ? '' : "".concat(xFactor, " * "), "x");

          if (this.intercept !== 0) {
            const absIntercept = Math.abs(this.intercept);
            const operator = absIntercept === this.intercept ? '+' : '-';
            result += " ".concat(operator, " ").concat(maybeToPrecision(absIntercept, precision));
          }
        } else {
          result += maybeToPrecision(this.intercept, precision);
        }

        return result;
      }

      toLaTeX(precision) {
        return this.toString(precision);
      }

      static load(json) {
        if (json.name !== 'simpleLinearRegression') {
          throw new TypeError('not a SLR model');
        }

        return new SimpleLinearRegression(true, json);
      }

    }

    function regress(slr, x, y) {
      const n = x.length;
      let xSum = 0;
      let ySum = 0;
      let xSquared = 0;
      let xY = 0;

      for (let i = 0; i < n; i++) {
        xSum += x[i];
        ySum += y[i];
        xSquared += x[i] * x[i];
        xY += x[i] * y[i];
      }

      const numerator = n * xY - xSum * ySum;
      slr.slope = numerator / (n * xSquared - xSum * xSum);
      slr.intercept = 1 / n * ySum - slr.slope * (1 / n) * xSum;
      slr.coefficients = [slr.intercept, slr.slope];
    }

    function minMax(spectra, targetSpectrum) {
      let range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let fromToIndex = getFromToIndex$1(targetSpectrum.normalized.x, range);
      let targetValue = {
        min: XY.minYPoint(targetSpectrum.normalized, fromToIndex).y,
        max: XY.maxYPoint(targetSpectrum.normalized, fromToIndex).y
      };
      let values = spectra.map(spectrum => {
        return {
          min: XY.minYPoint(spectrum.normalized, fromToIndex).y,
          max: XY.maxYPoint(spectrum.normalized, fromToIndex).y
        };
      });
      let matrix = [];

      for (let i = 0; i < spectra.length; i++) {
        let spectrum = spectra[i];
        const regression = new SimpleLinearRegression([targetValue.min, targetValue.max], [values[i].min, values[i].max]);
        let length = spectrum.normalized.y.length;
        let scaled = new Array(length);

        for (let j = 0; j < length; j++) {
          scaled[j] = regression.computeX(spectrum.normalized.y[j]);
        }

        matrix.push(scaled);
      }

      return matrix;
    }

    function range(spectra, targetSpectrum) {
      let range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let fromToIndex = getFromToIndex$1(targetSpectrum.normalized.x, range);
      let targetValue = XY.integration(targetSpectrum.normalized, fromToIndex);
      let values = spectra.map(spectrum => XY.integration(spectrum.normalized, fromToIndex));
      let matrix = [];

      for (let i = 0; i < spectra.length; i++) {
        let spectrum = spectra[i];
        let factor = targetValue / values[i];
        matrix.push(X.multiply(spectrum.normalized.y, factor));
      }

      return matrix;
    }
    /**
     * @private
     * @param {Array<Spectrum>} spectra
     * @param {object} [options={}] scale spectra based on various parameters
     * @param {object} [options.range] from - to
     * @param {Array} [options.ids] ids of selected spectra
     * @param {string} [options.targetID=spectra[0].id]
     * @param {string} [options.method='max'] min, max, range, minMax
     * @param {boolean} [options.relative=false]
     * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[] }
     */


    function getScaledData(spectraProcessor) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!spectraProcessor.spectra || !spectraProcessor.spectra[0]) return {};
      const {
        range: range$1,
        targetID,
        relative,
        method,
        ids
      } = options;
      let targetSpectrum = spectraProcessor.getSpectrum(targetID) || spectraProcessor.spectra[0];
      let spectra = spectraProcessor.getSpectra(ids);
      let result;

      if (method === '' || method === undefined) {
        result = getNormalizedData(spectra);
      } else {
        let matrix;

        switch (method.toLowerCase()) {
          case 'min':
            matrix = min$1(spectra, targetSpectrum, range$1);
            break;

          case 'max':
            matrix = max$1(spectra, targetSpectrum, range$1);
            break;

          case 'minmax':
            matrix = minMax(spectra, targetSpectrum, range$1);
            break;

          case 'range':
            matrix = range(spectra, targetSpectrum, range$1);
            break;

          default:
            throw new Error("getScaledData: unknown method: ".concat(method));
        }

        let meta = [];
        let currentIDs = [];

        for (let spectrum of spectra) {
          currentIDs.push(spectrum.id);
          meta.push(spectrum.meta);
        }

        let x = spectra[0].normalized.x;
        result = {
          ids: currentIDs,
          matrix,
          meta,
          x
        };
      }

      if (relative) {
        for (let i = 0; i < result.matrix.length; i++) {
          result.matrix[i] = X.subtract(result.matrix[i], targetSpectrum.normalized.y);
        }
      }

      return result;
    }

    class SpectraProcessor {
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
      constructor() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
        return getNormalizationAnnotations(this.normalization, this.getNormalizedBoundary());
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


      setNormalization() {
        let normalization = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
       * Returns an object {x:[], y:[]} containing the autocorrelation for the
       * specified index
       * @param {integer} [index] point of the spectrum to autocorrelate
       * @param {object} [options={}]
       * @param {array} [options.ids=[]] list of ids, by default all spectra
       */


      getAutocorrelation(index, options) {
        return getAutocorrelation(this.getNormalizedData(options), index);
      }
      /**
       * Returns a {x:[], y:[]} containg the average of specified spectra
       * @param {object} [options={}]
       * @param {array} [options.ids=[]] list of ids, by default all spectra
       */


      getMeanData(options) {
        return getMeanData(this.getNormalizedData(options));
      }
      /**
       * Returns an object contains 4 parameters with the normalized data
       * @returns {object} { ids:[], matrix:[Array], meta:[object], x:[] }
       * @param {object} [options={}]
       * @param {Array} [options.ids] List of spectra ids to export, by default all
       */


      getNormalizedData() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const {
          ids
        } = options;
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


      getNormalizedText() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const {
          ids
        } = options;
        let spectra = this.getSpectra(ids);
        return getNormalizedText(spectra, options);
      }

      getMinMaxX() {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (let spectrum of this.spectra) {
          if (spectrum.minX < min) min = spectrum.minX;
          if (spectrum.maxX > max) max = spectrum.maxX;
        }

        return {
          min,
          max
        };
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
       * @param {string} text
       * @param {object} [options={}]
       * @param {object} [options.parserOptions={}] XY parser options
       * @param {object} [options.meta={}]
       * @param {string} [options.meta.color]
       * @param {object} [options.id={}]
       * @param {object} [options.kind]
       * @param {boolean} [options.force=false] replace existing spectrum (same ID)
       */


      addFromText(text$1) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (options.force !== true && options.id && this.contains(options.id)) {
          return;
        }

        let parsed = text(text$1, options);

        let meta = _objectSpread2({}, parsed.meta, {}, options.meta || {});

        this.addFromData(parsed.data, {
          meta,
          id: options.id
        });
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


      addFromJcamp(jcamp$1) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (options.force !== true && options.id && this.contains(options.id)) {
          return;
        }

        let parsed = jcamp(jcamp$1);

        let meta = _objectSpread2({}, parsed.meta, {}, options.meta || {});

        this.addFromData(parsed.data, {
          meta,
          id: options.id
        });
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


      addFromData(data) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this.spectra.length === 0) this.keepOriginal = true;
        const id = options.id || Math.random().toString(36).substring(2, 10);
        let index = this.getSpectrumIndex(id);
        if (index === undefined) index = this.spectra.length;
        let spectrum = new Spectrum(data.x, data.y, id, {
          meta: options.meta,
          normalized: options.normalized,
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
        let currentIDs = this.spectra.map(spectrum => spectrum.id);

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
       * Returns a JSGraph annotation object for the specified index
       * @returns {object}
       */


      getTrackAnnotation(index, options) {
        return getTrackAnnotation(this.spectra, index, options);
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
        let memoryInfo = {
          original: 0,
          normalized: 0,
          total: 0
        };
        this.spectra.forEach(spectrum => {
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
          x: {
            min: Number.MAX_VALUE,
            max: Number.MIN_VALUE
          },
          y: {
            min: Number.MAX_VALUE,
            max: Number.MIN_VALUE
          }
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


      static fromNormalizedMatrix(text) {
        let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        let parsed = matrix(text, options);

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
          spectraProcessor.addFromData({
            x: [],
            y: []
          }, {
            normalized: {
              x: parsed.x,
              y: parsed.matrix[i]
            },
            id: parsed.ids[i],
            meta: parsed.meta[i]
          });
        }

        return spectraProcessor;
      }

    }

    exports.SpectraProcessor = SpectraProcessor;
  });
  var index = unwrapExports(lib);
  var lib_1 = lib.SpectraProcessor;

  exports.SpectraProcessor = lib_1;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=spectra-processor.js.map
