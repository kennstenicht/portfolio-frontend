import { module, test } from 'qunit';

import { booleanLabel } from 'portfolio/helpers/boolean-label';

module('Unit | Helper | boolean-label', function () {
  test('it returns the truthy label when the condition is true', function (assert) {
    const result = booleanLabel([true, 'yes', 'no']);

    assert.strictEqual(result, 'yes');
  });

  test('it returns the falsy label when the condition is false', function (assert) {
    const result = booleanLabel([false, 'yes', 'no']);

    assert.strictEqual(result, 'no');
  });
});
