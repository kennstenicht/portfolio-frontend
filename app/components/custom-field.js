import Component from '@ember/component';
import { set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  didReceiveAttrs() {
    let key = this.key;
    let model = this.model;

    this.fetchData.perform(key, model);
  },


  fetchData: task(function* (key, model) {
    let customFields = yield model.customFields
    let customField = customFields.findBy('key', key);

    return set(this, 'customField', customField);
  }).restartable(),

}).reopenClass({
  positionalParams: ['key', 'model']
});
