import type Store from '@ember-data/store';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Model | project', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store') as unknown as Store;
    const model = store.createRecord('project', {});

    assert.ok(model);
  });
});
