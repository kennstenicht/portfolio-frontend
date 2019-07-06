import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class AdminPagesIndexRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('admin.pages');
  }

  setupController(controller, model) {
    this._super(controller, model);

    set(controller, 'pages', model);
  }


  // Actions
  @action
  reorderItems(itemModels) {
    const controller = this.controllerFor('admin.pages.index');

    itemModels.forEach(function (page, index) {
      set(page, 'position', index);
      page.save();
    });
    set(controller, 'pages', itemModels);
  }
}
