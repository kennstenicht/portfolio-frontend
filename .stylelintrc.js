'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'custom-property-pattern': null,
    'selector-class-pattern': null,
  },
};
