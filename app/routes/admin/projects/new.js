import Route from '@ember/routing/route';

export default class AdminProjectsNewRoute extends Route {
  // Hooks
  model() {
    return this.store.createRecord('project');
  }
}
