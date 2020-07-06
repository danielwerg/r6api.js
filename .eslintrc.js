module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    amd: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'prefer-arrow',
    'import'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'off', { accessibility: 'explicit' }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs', { allowSingleLine: true }
    ],
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        leadingUnderscore: 'allow',
        format: ['StrictPascalCase'],
        prefix: ['I']
      }
    ],
    '@typescript-eslint/no-extra-semi': 'warn',

    'semi': ['warn', 'always'],
    'arrow-parens': ['off', 'always'],
    'comma-dangle': 'warn',
    'complexity': 'off',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'smart'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'external',
          'builtin',
          'internal',
          ['sibling', 'parent'],
          'index'
        ]
      }
    ],
    'max-classes-per-file': 'off',
    'max-len': [
      'warn',
      {
        code: 95,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'new-parens': 'error',
    'no-caller': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-eval': 'error',
    'no-invalid-this': 'error',
    'no-new-wrappers': 'error',
    'no-shadow': ['error', { hoist: 'all' }],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unused-expressions': 'error',
    'object-shorthand': 'error',
    'one-var': ['off', 'never'],
    'spaced-comment': ['error', 'always'],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
