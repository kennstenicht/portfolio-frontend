import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Transition from '@ember/routing/-private/transition';
import Controller from '@ember/controller';
import IntlService from 'ember-intl/services/intl';

export default class ProjectsRoute extends Route {
  // Services
  @service declare intl: IntlService;

  // Hooks
  setupController(controller: Controller, error: any, transition: Transition) {
    controller.model = error;

    super.setupController(controller, error, transition);
  }
}
