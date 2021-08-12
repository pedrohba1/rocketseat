module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
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
      'camelcase': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
        'warn',
        {extensions: ['.jsx', '.js']}
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign':'off',
    'no-return-assign': 'off',
    'consistent-return':'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'

},
settings:{
    'import/resolver':{
        'babel-plugin-root-import': {
            rootPathSuffix: 'src'
        }
    }
}
};
