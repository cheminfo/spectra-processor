import { getClass } from '../getClass';

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

test('getClass', () => {
  let result = getClass(metadata);
  expect(result).toEqual([0, 1, 0]);
});
