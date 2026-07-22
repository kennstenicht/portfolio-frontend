import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import PageModel from 'portfolio/models/page';

export default class PagesShowRoute extends Route<PageModel> {
  // Services
  @service declare store: Store;

  // Hooks
  model(params: { page_id: string }) {
    return this.store.findRecord<PageModel>('page', params.page_id);
  }
}
