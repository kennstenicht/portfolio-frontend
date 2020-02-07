import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { pluralize } from 'ember-inflector';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class AdminRoute extends Route.extend(
  AuthenticatedRouteMixin
) {
  @action
  reorderItems(itemModels, draggedModel) {
    const routeName = pluralize(draggedModel.constructor.modelName);
    const controller = this.controllerFor(`admin.${routeName}.index`);

    itemModels.forEach((record, index) => {
      record.set('position', index);
      record.save();
    });

    controller.set('records', itemModels);
  }
}
