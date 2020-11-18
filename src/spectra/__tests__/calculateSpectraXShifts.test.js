import { SpectraProcessor } from '../../SpectraProcessor';
import { calculateSpectraXShifts } from '../calculateSpectraXShifts';

describe('Get shifts of spectra', () => {
  it('Should return an array with the difference in points between target and the signal', () => {
    const spectraProcessor = new SpectraProcessor({});

    spectraProcessor.addFromData(
      {
        x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [1, 1, 5, 1, 1, 1, 700, 1, 1, 1, 1, 1, 1],
      },
      { id: 1 },
    );
    spectraProcessor.addFromData(
      {
        x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        y: [1, 1, 1, 1, 700, 1, 5, 1, 1, 1, 1, 1, 1],
      },
      { id: 2 },
    );

    let gsdOptions = {
      minMaxRatio: 0.4,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    };

    const spectra = spectraProcessor.getSpectra();

    calculateSpectraXShifts(spectra, 1, 10, {
      targetX: 6,
      gsd: gsdOptions,
    });

    expect(spectra[0].xShift).toBe(0);
    expect(spectra[1].xShift).toBe(2);
  });
});
