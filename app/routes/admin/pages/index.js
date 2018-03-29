import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  // Hooks
  model() {
    return get(this, 'store').findAll('page').then(this._sortModel);
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

  // Privat functions
  _sortModel(model) {
    return model.sortBy('position');
  },
});
