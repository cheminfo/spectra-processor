import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { SpectraProcessor } from '../../SpectraProcessor';
import { getPostProcessedText } from '../getPostProcessedText';

expect.extend({ toBeDeepCloseTo });

let spectraProcessor = new SpectraProcessor();
spectraProcessor.spectra = [
  {
    id: 1,
    normalized: {
      x: [10, 20, 30],
      y: [1, 2, 3],
    },
  },
  {
    id: 2,
    normalized: {
      x: [10, 20, 30],
      y: [2, 3, 4],
    },
  },
  {
    id: 3,
    normalized: {
      x: [10, 20, 30],
      y: [3, 4, 5],
    },
  },
];

test('getPostProcessedText', () => {
  let result = getPostProcessedText(spectraProcessor, {
    postProcessing: {
      scale: {
        method: 'min',
      },
    },
  });
  expect(result).toHaveLength(71);
  // eslint-disable-next-line no-tabs
  expect(result).toMatchInlineSnapshot(`
    "id	10	20	30
    1	1	2	3
    2	1	1.5	2
    3	1	1.3333333333333333	1.6666666666666665"
  `);
});
