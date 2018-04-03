import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default Component.extend({
  // Services
  router: service(),

  // Computed properties
  formTemplate: computed('model.constructor.modelName', function () {
    let modelName = get(this,'model.constructor.modelName');

    if(getOwner(this).lookup('template:components/admin-form/-' + modelName)) {
      return 'components/admin-form/-' + modelName;
    } else {
      return 'components/admin-form/-default';
    }
  }),

  // Actions
  actions: {
    save() {
      Promise.all(get(this, 'model.customFields').invoke('save'))
        .then((customFields) => {
          get(this, 'model').set('customFields', customFields);
          get(this, 'model').save()
            .then(this._transitionToIndex.bind(this))
            .catch(this._throwError.bind(this));
        })
        .catch(this._throwError.bind(this));

    },

    deleteRecord() {
      get(this, 'model').destroyRecord()
        .then(this._transitionToIndex.bind(this))
        .catch(this._throwError.bind(this));
    }
  },

  // Privat functions
  _transitionToIndex() {
    // TODO add type to transition
    get(this, 'router').transitionTo('admin.pages');
  },

  _throwError(reason) {
    let error = reason.errors || reason;
    console.log(error);
  }
});
