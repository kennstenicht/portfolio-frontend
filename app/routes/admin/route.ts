import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Transition from '@ember/routing/-private/transition';
import { pluralize } from 'ember-inflector';
import FlashMessagesService from 'ember-cli-flash/services/flash-messages';
import IntlService from 'ember-intl/services/intl';
import SessionService from 'ember-simple-auth/services/session';
import Model from 'portfolio/models/base';

export default class AdminRoute extends Route {
  // Services
  @service flashMessages!: FlashMessagesService;
  @service intl!: IntlService;
  @service session!: SessionService;


  // Hooks
  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
  }


  // Actions
  @action
  async save(model: Model) {
    try {
      const modelName = model.constructor.modelName;
      const message = this.intl.t('admin.saveRecord', {
        title: model.displayLabel
      });

      await model.save();

      this.flashMessages.success(message);
      this.transitionToIndex(modelName);
    } catch (e) {
      this.flashMessages.error(e.message);
    }
  }

  @action
  async delete(model: Model) {
    try {
      const modelName = model.constructor.modelName;
      const message = this.intl.t('admin.deleteRecord', {
        title: model.displayLabel
      });

      await model.destroyRecord()

      this.flashMessages.success(message);
      this.transitionToIndex(modelName);
    } catch (e) {
      this.flashMessages.error(e.message);
    }
  }

  @action
  cancel(modelName: string) {
    this.transitionToIndex(modelName);
  }


  // Functions
  transitionToIndex(modelName: string) {
    this.transitionTo(`admin.${pluralize(modelName)}`);
  }
}
