import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { SpectraProcessor } from '../../SpectraProcessor.ts';
import { getPostProcessedText } from '../getPostProcessedText.ts';

expect.extend({ toBeDeepCloseTo });

test('getPostProcessedText', () => {
  const spectraProcessor = new SpectraProcessor();
  spectraProcessor.spectra = [
    // @ts-expect-error partial Spectra for tests
    {
      id: '1',
      normalized: {
        x: [10, 20, 30],
        y: [1, 2, 3],
      },
    },
    // @ts-expect-error partial Spectra for tests
    {
      id: '2',
      normalized: {
        x: [10, 20, 30],
        y: [2, 3, 4],
      },
    },
    // @ts-expect-error partial Spectra for tests
    {
      id: '3',
      normalized: {
        x: [10, 20, 30],
        y: [3, 4, 5],
      },
    },
  ];

  const result = getPostProcessedText(spectraProcessor, {
    postProcessing: {
      scale: {
        method: 'min',
      },
    },
  });

  expect(result).toHaveLength(71);
  expect(result).toMatchInlineSnapshot(`
    "id	10	20	30
    1	1	2	3
    2	1	1.5	2
    3	1	1.3333333333333333	1.6666666666666665"
  `);
});
