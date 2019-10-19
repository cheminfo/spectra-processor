import { getAutocorrelationChart } from '../jsgraph/getAutocorrelationChart';
import { SpectraProcessor } from '../SpectraProcessor';

describe('getAutocorrelationChart', () => {
  it('check jsgraph chart', () => {
    const spectraProcessor = new SpectraProcessor({
      normalization: {
        from: 0,
        to: 3,
        numberOfPoints: 4,
      },
    });

    spectraProcessor.addFromData(
      { x: [0, 1, 2, 3], y: [1, 2, 3, 4] },
      { id: 1 },
    );
    spectraProcessor.addFromData(
      { x: [0, 1, 2, 3], y: [2, 3, 4, 5] },
      { id: 2 },
    );
    spectraProcessor.addFromData(
      { x: [0, 1, 2, 3], y: [3, 4, 5, 6] },
      { id: 3 },
    );

    let result = getAutocorrelationChart(spectraProcessor);

    expect(result).toMatchSnapshot();
  });
});
