import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  page_id: string
}

export default class AdminPagesEditRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ page_id }: Params) {
    return this.store.findRecord('page', page_id);
  }
}
