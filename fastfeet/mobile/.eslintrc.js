module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    "FormData": true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks'
  ],
  rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [
          'warn', {
              extensions: ['.jsx', '.js']
          }
      ],
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'no-param-reassign': 'off'
  },
   settings:{
    'import/resolver':{
        'babel-plugin-root-import':{
            rootPathSuffix:'src'
        }
    }
  },
};
