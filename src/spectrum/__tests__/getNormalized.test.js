import { getNormalized } from '../getNormalized';

describe('getNormalized', () => {
  it('no SNV', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 1,
        to: 9,
        numberOfPoints: 5,
      },
    ).data;

    expect(result.x).toStrictEqual([1, 3, 5, 7, 9]);
    expect(result.y).toStrictEqual([1, 3, 4.5, 3, 1]);
  });

  it('with align', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let y = [0, 0, 0, 0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 0, 0, 0];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 0,
        to: 16,
        numberOfPoints: 5,
        filters: [
          {
            name: 'align',
            options: {
              from: 1,
              to: 16,
              nbPeaks: 1,
              targetX: 1,
            },
          },
        ],
      },
    ).data;
    expect(result.x).toStrictEqual([0, 4, 8, 12, 16]);
    expect(result.y).toStrictEqual([3.75, 2, 0, 0, 0]);
  });
  it('with SNV', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let result = getNormalized(
      {
        x,
        y,
      },
      {
        from: 1,
        to: 9,
        numberOfPoints: 5,
        filters: [{ name: 'centerMean' }, { name: 'scaleSD' }],
      },
    ).data;

    expect(result.x).toStrictEqual([1, 3, 5, 7, 9]);
    expect(result.y).toStrictEqual([
      -0.7581425055034354,
      0.4332242888591059,
      1.3267493846310112,
      0.4332242888591029,
      -0.7581425055034343,
    ]);
  });
});
