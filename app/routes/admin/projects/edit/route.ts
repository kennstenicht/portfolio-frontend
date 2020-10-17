import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  project_id: string
}

export default class AdminProjectsEditRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ project_id }: Params) {
    return this.store.findRecord('project', project_id);
  }
}
