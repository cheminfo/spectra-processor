import { getData } from '../getData';

describe('getData', () => {
  it('check from to and exclusions', () => {
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    let result = getData(
      {
        x,
        y,
      },
      {
        from: 1,
        to: 9,
        exclusions: [{ from: 1.9, to: 3.1 }, { from: 4.9, to: 6.1 }],
      },
    );

    expect(result.x).toStrictEqual([1, 4, 7, 8, 9]);
    expect(result.y).toStrictEqual([1, 4, 3, 2, 1]);
  });
});
