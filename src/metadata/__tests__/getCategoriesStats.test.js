import { getCategoriesStats } from '../getCategoriesStats';

let metadata = [
  {
    category: 'A',
  },
  {
    category: 'B',
  },
  {
    category: 'A',
  },
];

test('getCategoriesStats', () => {
  let result = getCategoriesStats(metadata);
  expect(result).toEqual({
    A: { classNumber: 0, counter: 2 },
    B: { classNumber: 1, counter: 1 },
  });
});
