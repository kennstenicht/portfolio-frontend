import Route from '@ember/routing/route';

export default class AdminPagesNewRoute extends Route {
  // Hooks
  model() {
    return this.store.createRecord('page');
  }
}
