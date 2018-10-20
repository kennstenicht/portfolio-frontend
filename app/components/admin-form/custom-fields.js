import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  // Services
  store: service(),

  // Actions
  actions: {
    addCustomField() {
      let customField = this.store.createRecord('customField');

      this.model.customFields.pushObject(customField);
    },

    removeCustomField(customField) {
      customField.destroyRecord();
    }
  },
});
