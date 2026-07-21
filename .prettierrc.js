'use strict';

module.exports = {
  quoteProps: 'consistent',

  singleQuote: true,
  templateSingleQuote: false,
  plugins: [
    'prettier-plugin-ember-template-tag',
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: ['<THIRD_PARTY_MODULES>', '^portfolio/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSideEffects: false,
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
