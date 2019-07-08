# spectra-processor

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

## Introduction

This package allows to store spectra in an object and make many processing on them

It should be able to deal with large amount of large files and will automatically reduce the data
size in order to keep reasonable size. The idea is that all the sun of data should not contain
over 50 millions points with corresponds to 400Mb of data.

If you plan to use larger amount you need to add filters during loading of the data

## Installation

`$ npm install --save spectra-processor`

## Usage

```js
import SpectraProcessor from 'spectra-processor';

let spectrum = SpectraProcessor.fromJcamp(jcamp);

// let spectrum = SpectraProcessor.fromText(jcamp);

spectrum.setPeaks([]);

// if optimize is true, peak picking will find the best peak close to wavelength
spectrum.peakPicking(wavelength, { range: 0, optimize: true });
console.log(spectrum.peaks());

spectrum.autoPeakPicking({
  fromWavelength: 1500,
  toWavelength: 4000,
  noiseLvel: 0.01
});

// you may selecdt how you would like to retrieve the data
// there are 3 modes: ABSORBANCE, TRANSMITTANCE or PERCENT_TRANSMITTANCE
// those methods are very practical in coordination with www.jsgraph.org
spectrum.setMode(SpectraProcessor.ABSORBANCE);
let annotations = spectrum.getAnnotations();
let data = spectrum.getData();
```

## [API Documentation](https://cheminfo.github.io/spectra-processor/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/spectra-processor.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/spectra-processor
[travis-image]: https://img.shields.io/travis/cheminfo/spectra-processor/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo/spectra-processor
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/spectra-processor.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/spectra-processor
[download-image]: https://img.shields.io/npm/dm/spectra-processor.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/spectra-processor
