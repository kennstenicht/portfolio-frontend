import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';

export default class CustomFieldsComponent extends Component {
  // Defaults
  static positionalParams = ['key', 'model'];


  // Hooks
  constructor() {
    super(...arguments);

    this.fetchData.perform(this.model, this.key);
  }

  @task({
    restartable: true
  })
  *fetchData(model, key) {
    let customFields = yield model.customFields
    let customField = yield customFields.findBy('key', key);

    return this.customField = customField;
  }
}
