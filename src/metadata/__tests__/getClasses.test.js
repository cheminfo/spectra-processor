import { getClasses } from '../getClasses';

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

test('getClasses', () => {
  let result = getClasses(metadata);
  expect(result).toStrictEqual(['A', 'B', 'A']);
});
