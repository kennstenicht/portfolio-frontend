import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import HeadDataService from 'portfolio/services/head-data';
import IntlService from 'ember-intl/services/intl';

export default class ProjectsIndexRoute extends Route {
  // Services
  @service declare headData: HeadDataService;
  @service declare intl: IntlService;

  // Hooks
  model() {
    return this.modelFor('projects');
  }
}
