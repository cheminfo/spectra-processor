import { Spectrum } from '../Spectrum';

describe('Spectrum', () => {
  it('removing the original data', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let result = new Spectrum(x, y, 'test', {
      normalization: {
        numberOfPoints: 6
      }
    });
    result.removeOriginal();
    expect(result.x).toBeUndefined();
    expect(result.y).toBeUndefined();
    expect(result.normalized).toStrictEqual({
      x: [0, 2, 4, 6, 8, 10],
      y: [0.25, 2, 4, 4, 2, 0.25]
    });

    expect(() => {
      result.updateNormalization({});
    }).toThrow('Can not get normalized data');
  });

  it('keeping the original data', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let spectrum = new Spectrum(x, y, 'test', {
      normalization: {
        numberOfPoints: 6
      }
    });

    expect(spectrum.x).toStrictEqual(x);
    expect(spectrum.y).toStrictEqual(y);
    expect(spectrum.normalized).toStrictEqual({
      x: [0, 2, 4, 6, 8, 10],
      y: [0.25, 2, 4, 4, 2, 0.25]
    });

    spectrum.updateNormalization({ numberOfPoints: 11 });
    expect(spectrum.normalized.x).toStrictEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]);
  });
});
