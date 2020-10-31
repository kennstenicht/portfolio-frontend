import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import HeadDataService from 'portfolio/services/head-data';
import FastbootService from 'ember-cli-fastboot/services/fastboot';
import IntlService from 'ember-intl/services/intl';
import Transition from '@ember/routing/-private/transition';
import Controller from '@ember/controller';

export default class ProjectsRoute extends Route {
  // Services
  @service fastboot!: FastbootService;
  @service headData!: HeadDataService;
  @service intl!: IntlService;


  // Getter and setter
  get metaTags() {
    return {
      title: this.intl.t('error.metaTitle'),
      description: this.intl.t('error.metaDescription'),
      image: `images/meta/sharing-image--404.jpg`
    }
  }


  // Hooks
  setupController(controller: Controller, error: any, transition: Transition) {
    controller.model = error;

    if (this.fastboot.isFastBoot) {
      this.fastboot.response.statusCode = error.code;
    }

    super.setupController(controller, error, transition);
  }
}
