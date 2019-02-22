import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default Component.extend({
  // Services
  router: service(),

  // Computed properties
  formTemplate: computed('model.constructor.modelName', function () {
    let modelName = this.model.constructor.modelName;

    if(getOwner(this).lookup('template:components/admin-form/-' + modelName)) {
      return 'components/admin-form/-' + modelName;
    } else {
      return 'components/admin-form/-default';
    }
  }),

  // Actions
  actions: {
    save() {
      Promise.all(this.model.customFields.invoke('save'))
        .then((customFields) => {
          this.model.set('customFields', customFields);
          this.model.save()
            .then(this._transitionToIndex.bind(this))
            .catch(this._throwError.bind(this));
        })
        .catch(this._throwError.bind(this));

    },

    deleteRecord() {
      this.model.destroyRecord()
        .then(this._transitionToIndex.bind(this))
        .catch(this._throwError.bind(this));
    }
  },

  // Privat functions
  _transitionToIndex() {
    // TODO add type to transition
    this.router.transitionTo('admin.pages');
  },

  _throwError(reason) {
    let error = reason.errors || reason;
    // eslint-disable-next-line no-console
    console.log(error);
  }
});
