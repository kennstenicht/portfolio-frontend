import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Service | swiper', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:swiper');
    assert.ok(service);
  });
});
