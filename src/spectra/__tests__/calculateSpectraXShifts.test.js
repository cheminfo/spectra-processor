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

    spectraProcessor.setNormalization({
      from: 0,
      to: 12,
      numberOfPoints: 12,
    });

    let gsdOptions = {
      minMaxRatio: 0.4,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 5,
        polynomial: 3,
      },
    };

    const targetPoint = 5;
    const spectra = spectraProcessor.getSpectra();
    calculateSpectraXShifts(spectra, targetPoint, {
      from: 1,
      to: 10,
      gsdOptions,
    });

    const targetIndex = spectra[0].x.indexOf(targetPoint);
    expect(spectra[0].shift).toStrictEqual(
      targetIndex - spectra[0].y.indexOf(700),
    );
    expect(spectra[1].shift).toStrictEqual(
      targetIndex - spectra[1].y.indexOf(700),
    );
  });
});
