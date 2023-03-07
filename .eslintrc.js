module.exports = {
  extends: '@danielwerg/eslint-config',
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json'
  },
  rules: {
    '@typescript-eslint/prefer-reduce-type-parameter': 'off' // groupBy func, reduce type casting
  }
};
