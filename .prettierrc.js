'use strict';

module.exports = {
  singleQuote: true,
  templateSingleQuote: false,
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.hbs',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.{js,ts}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
