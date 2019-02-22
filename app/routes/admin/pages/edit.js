import Route from '@ember/routing/route';

export default class AdminPagesEditRoute extends Route {
  // Hooks
  model(params) {
    return this.modelFor('admin.pages')
      .findBy('id', params.id);
  }
}
