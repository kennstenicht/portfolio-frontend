import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default class AdminPagesIndexRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('admin.pages');
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    set(controller, 'records', model);
  }
}
