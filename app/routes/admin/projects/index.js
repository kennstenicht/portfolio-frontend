import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  // Hooks
  model() {
    return this.modelFor('admin.projects');
  },

  setupController(controller, model) {
    this._super(controller, model);

    set(controller, 'projects', this.modelFor('admin.projects'));
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
  }
});
