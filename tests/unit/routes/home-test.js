import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | home', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:home');
    assert.ok(route);
  });
});
