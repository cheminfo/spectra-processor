import { getClassLabels } from '../getClassLabels';

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

test('getClassLabels', () => {
  let result = getClassLabels(metadata);
  expect(result).toStrictEqual(['A', 'B', 'A']);
});
