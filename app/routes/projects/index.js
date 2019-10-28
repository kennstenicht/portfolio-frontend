import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsIndexRoute extends Route {
  // Services
  @service headData;
  @service intl;

  // Hooks
  model() {
    return this.modelFor('projects');
  }

  afterModel() {
    this.headData.routeMetaTags = {
      title: this.intl.t('projects.index.metaTitle')
    }
  }
}
