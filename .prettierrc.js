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
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
  ],
};
