import Route from '@ember/routing/route';

export default class AdminProjectsRoute extends Route {
  // Hooks
  model() {
    return this.store.query('project', { sort: 'position' });
  }
}
