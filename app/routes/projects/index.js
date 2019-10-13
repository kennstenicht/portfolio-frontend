import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsIndexRoute extends Route {
  // Services
  @service headData;


  // Hooks
  model() {
    return this.modelFor('projects');
  }

  afterModel() {
    this.headData.title = 'meine arbeiten | christoph wiedenmann';
    this.headData.description = 'lorem ipsum';
  }
}
