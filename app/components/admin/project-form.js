import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  // Services
  router: service(),

  // Actions
  actions: {
    save(model) {
      model.save()
        .then(this._transitionToProjects.bind(this))
        .catch(this._throwError.bind(this));
    },

    deleteRecord(model) {
      model.destroyRecord()
        .then(this._transitionToProjects.bind(this));
    },
  },

  // Privat functions
  _transitionToProjects() {
    get(this, 'router').transitionTo('admin.projects');
  },

  _throwError(reason) {
    let error = reason.errors || reason;
    console.log(error);
  }
});
