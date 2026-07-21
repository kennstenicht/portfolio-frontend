import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | pages/home', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:pages/home');
    assert.ok(route);
  });
});
