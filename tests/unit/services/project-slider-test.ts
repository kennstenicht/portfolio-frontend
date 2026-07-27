import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Service | project-slider', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:project-slider');

    assert.ok(service);
  });
});
