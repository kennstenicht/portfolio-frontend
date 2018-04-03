import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  // Hooks
  model() {
    return this.modelFor('admin.pages');
  },

  setupController(controller, model) {
    this._super(controller, model);

    set(controller, 'pages', model);
  },


  // Actions
  actions: {
    reorderItems(itemModels) {
      const controller = this.controllerFor('admin.pages.index');

      itemModels.forEach(function (page, index) {
        set(page, 'position', index);
        page.save();
      });
      set(controller, 'pages', itemModels);
    }
  },

  shouldReloadRecord() {
    return true;
  },
});
