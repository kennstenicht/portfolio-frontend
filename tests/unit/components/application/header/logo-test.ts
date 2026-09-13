import { module, test } from 'qunit';

import { WORDS } from 'portfolio/components/application/header/logo';

module('Unit | Component | application/header/logo', function () {
  test('every word fills the same number of grid cells', function (assert) {
    const [defaultWord] = WORDS;

    assert.ok(defaultWord, 'there is a default word');

    for (const word of WORDS) {
      // A shorter word would leave the trailing cells without a letter, so the
      // padding spaces in the list are load-bearing.
      assert.strictEqual(
        word.length,
        defaultWord?.length,
        `"${word}" is padded to ${defaultWord?.length} characters`,
      );
    }
  });
});
