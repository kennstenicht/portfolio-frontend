import Route from '@ember/routing/route';

export default class AdminProjectsEditRoute extends Route {
  // Hooks
  model(params) {
    return this.modelFor('admin.projects')
      .findBy('id', params.id);
  }
}
