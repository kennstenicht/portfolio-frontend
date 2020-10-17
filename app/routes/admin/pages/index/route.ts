import Route from '@ember/routing/route';

export default class AdminPagesIndexRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('admin.pages');
  }
}
