import Route from '@ember/routing/route';

export default class ProjectsIndexRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('projects');
  }
}
