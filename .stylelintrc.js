'use strict';

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    // `composes` is a CSS Modules property, not standard CSS.
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
  },
};
