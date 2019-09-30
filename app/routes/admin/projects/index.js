import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class AdminProjectsIndexRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('admin.projects');
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    set(controller, 'projects', model);
  }


  // Actions
  @action
  reorderItems(itemModels) {
    const controller = this.controllerFor('admin.projects.index');

    itemModels.forEach(function (project, index) {
      set(project, 'position', index);
      project.save();
    });
    set(controller, 'projects', itemModels);
  }
}
