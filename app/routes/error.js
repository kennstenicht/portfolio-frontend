import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsRoute extends Route {
  // Services
  @service headData;
  @service intl;
  @service fastboot;

  get metaTags() {
    return {
      title: this.intl.t('error.metaTitle'),
      description: this.intl.t('error.metaDescription'),
      image: `images/meta/sharing-image--404.jpg`
    }
  }


  // Hooks
  setupController(controller, error) {
    controller.model = error;

    if (this.fastboot.isFastBoot) {
      this.fastboot.response.statusCode = error.code;
    }

    super.setupController(...arguments);
  }
}
