import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  // Services
  store: service(),

  // Actions
  actions: {
    addCustomField() {
      let customField = get(this, 'store').createRecord('customField');

      get(this, 'model.customFields').pushObject(customField);
    },

    removeCustomField(customField) {
      customField.destroyRecord();
    }
  },
});
