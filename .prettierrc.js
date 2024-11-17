'use strict';

module.exports = {
  quoteProps: 'consistent',

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
      files: '*.{js,ts,gjs,gts}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
