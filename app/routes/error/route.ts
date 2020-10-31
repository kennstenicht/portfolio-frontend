import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Transition from '@ember/routing/-private/transition';
import Controller from '@ember/controller';
import FastbootService from 'ember-cli-fastboot/services/fastboot';
import IntlService from 'ember-intl/services/intl';

export default class ProjectsRoute extends Route {
  // Services
  @service fastboot!: FastbootService;
  @service intl!: IntlService;


  // Hooks
  setupController(controller: Controller, error: any, transition: Transition) {
    controller.model = error;

    if (this.fastboot.isFastBoot) {
      this.fastboot.response.statusCode = error.code;
    }

    super.setupController(controller, error, transition);
  }
}
