import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Route | projects/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:projects/index');
    assert.ok(route);
  });
});
