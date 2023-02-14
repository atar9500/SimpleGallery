module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import', '@welldone-software'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'index',
          'object',
          ['parent', 'sibling'],
        ],
      },
    ],
    'no-console': ['warn', {allow: ['error', 'warn']}],
    '@typescript-eslint/no-explicit-any': 'error',
    '@welldone-software/modules-engagement': 'error',
  },
};
