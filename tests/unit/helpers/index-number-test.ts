import { module, test } from 'qunit';

import { indexNumber } from 'portfolio/helpers/index-number';

module('Unit | Helper | index-number', function () {
  test('it pads single-digit indexes with a leading zero', function (assert) {
    assert.strictEqual(indexNumber([0]), '01');
    assert.strictEqual(indexNumber([8]), '09');
  });

  test('it does not pad double-digit indexes', function (assert) {
    assert.strictEqual(indexNumber([9]), '10');
    assert.strictEqual(indexNumber([10]), '11');
  });
});
