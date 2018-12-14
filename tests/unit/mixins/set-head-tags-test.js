import EmberObject from '@ember/object';
import SetHeadTagsMixin from 'portfolio/mixins/set-head-tags';
import { module, test } from 'qunit';

module('Unit | Mixin | set head tags', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let SetHeadTagsObject = EmberObject.extend(SetHeadTagsMixin);
    let subject = SetHeadTagsObject.create();
    assert.ok(subject);
  });
});
