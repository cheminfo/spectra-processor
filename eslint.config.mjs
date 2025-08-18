import cheminfo from 'eslint-config-cheminfo';

export default [
  ...cheminfo,
  {
    languageOptions: {
      globals: {
        __dirname: 'readonly',
      },
    },
    rules: {
      // 'unicorn/no-array-reverse': 'off',
      'import/extensions': ['error', 'always'],
    },
  },
];
