import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | pages/show', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:pages/show');
    assert.ok(route);
  });
});
