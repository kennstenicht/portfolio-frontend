import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class AdminRoute extends Route.extend(
  AuthenticatedRouteMixin
) {
  // Services
  @service flashMessages;
  @service intl;


  // Actions
  @action
  save(model) {
    model.save().then((model) => {
      const modelName = model.constructor.modelName;

      const message = this.intl.t('admin.saveRecord', {
        title: model.displayLabel
      });

      this.flashMessages.success(message);
      this.transitionToIndex(modelName);
    }).catch(function(e) {
      this.flashMessages.error(e.message);
    });
  }

  @action
  delete(model) {
    const modelName = model.constructor.modelName;

    model.destroyRecord().then(() => {
      const message = this.intl.t('admin.deleteRecord', {
        title: model.displayLabel
      });

      this.flashMessages.success(message);
      this.transitionToIndex(modelName);
    })
  }

  @action
  cancel(modelName) {
    this.transitionToIndex(modelName);
  }

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


  // Functions
  transitionToIndex(modelName) {
    this.transitionTo(`admin.${pluralize(modelName)}`);
  }
}
