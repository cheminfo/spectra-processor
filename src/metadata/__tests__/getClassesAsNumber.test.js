import { getClassesAsNumber } from '../getClassesAsNumber';

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

test('getClassesAsNumber', () => {
  let result = getClassesAsNumber(metadata);
  expect(result).toStrictEqual([0, 1, 0]);
});
