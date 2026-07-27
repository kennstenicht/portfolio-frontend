import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Service | store', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:store');

    assert.ok(service);
  });
});
