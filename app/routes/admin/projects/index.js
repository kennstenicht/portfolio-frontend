import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  // Hooks
  model() {
    return get(this, 'store').findAll('project').then(this._sortModel);
  },

  setupController(controller, model) {
    this._super(controller, model);

    set(controller, 'projects', model);
  },


  // Actions
  actions: {
    reorderItems(itemModels) {
      const controller = this.controllerFor('admin.projects.index');

      itemModels.forEach(function (project, index) {
        set(project, 'position', index);
        project.save();
      });
      set(controller, 'projects', itemModels);
    }
  },

  shouldReloadRecord() {
    return true;
  },

  // Privat functions
  _sortModel(model) {
    return model.sortBy('position');
  },
});
