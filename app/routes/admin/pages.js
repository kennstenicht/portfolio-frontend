import Route from '@ember/routing/route';

export default class AdminPagesRoute extends Route {
  // Hooks
  model() {
    return this.store.query('page', { sort: 'position' });
  }
}
