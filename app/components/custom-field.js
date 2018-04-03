import Component from '@ember/component';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  didReceiveAttrs() {
    let key = get(this, 'key');
    let model = get(this, 'model');

    get(this, 'fetchData').perform(key, model);
  },


  fetchData: task(function* (key, model) {
    let customFields = yield get(model, 'customFields')
    let customField = customFields.findBy('key', key);

    return set(this, 'customField', customField);
  }).restartable(),

}).reopenClass({
  positionalParams: ['key', 'model']
});
