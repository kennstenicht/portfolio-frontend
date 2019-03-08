import Component from '@ember/component';
import { set } from '@ember/object';
import { task } from 'ember-concurrency-decorators';

export default class CustomFieldsComponent extends Component {
  // Defaults
  static positionalParams = ['key', 'model'];
  tagName = '';


  // Hooks
  didReceiveAttrs() {
    let key = this.key;
    let model = this.model;

    this.get('fetchData').perform(key, model);
  }

  @task({
    restartable: true
  })
  *fetchData(key, model) {
    let customFields = yield model.customFields
    let customField = customFields.findBy('key', key);

    return set(this, 'customField', customField);
  }
}
