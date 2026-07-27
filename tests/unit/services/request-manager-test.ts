import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Service | request-manager', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:request-manager');

    assert.ok(service);
  });
});
