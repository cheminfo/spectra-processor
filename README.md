# spectra-processor

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

## Introduction

This package allows to store spectra in an object and make many processing on them

It should be able to deal with large amount of large files and will automatically reduce the data size in order to keep reasonable size. This reduction of data is based on normalization parameters that includes:
* from / to
* normalization filters
* final number of points
* exclusion zones

The package will try by default to have less than 64 Mb of memory used and if the presence of original data yield to a higher amount it will remove the orignal data.
This will have as consequence that you will not be able to change the normalization parameters. 

Practically this means that if you have 1024 spectra of 65536 points and you normalize the data to 4096 points it can still be kept in memory.

* Memory for spectra:  1024 * 65536 * 8 (double): over 64 Mb, original spectra will be removed
* Memory for normalized: 1024 * 4k * 8: 32 Mb: can be processed further



## Installation

`$ npm install --save spectra-processor`

## Usage

```js
import SpectraProcessor from 'spectra-processor';

let spectrum = SpectraProcessor.addFromJcamp(jcamp);
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
