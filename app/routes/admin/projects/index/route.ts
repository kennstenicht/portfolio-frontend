import Route from '@ember/routing/route';

export default class AdminProjectsIndexRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('admin.projects');
  }
}
