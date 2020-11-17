import { SpectraProcessor } from '../../SpectraProcessor';
import { getSpectraShifts } from '../getSpectraShifts';

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

    const targetPoint = 5;
    const from = 1;
    const to = 10;
    const spectra = spectraProcessor.getSpectra();
    const shifts = getSpectraShifts(spectra, targetPoint, from, to, gsdOptions);
    const targetIndex = spectra[0].x.indexOf(targetPoint);
    expect(shifts[0]).toStrictEqual(targetIndex - spectra[0].y.indexOf(700));
    expect(shifts[1]).toStrictEqual(targetIndex - spectra[1].y.indexOf(700));
  });
});
