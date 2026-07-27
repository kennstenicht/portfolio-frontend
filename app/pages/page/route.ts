import Route from '@ember/routing/route';
import { service } from '@ember/service';

import { getPage } from 'portfolio/data/page';
import type Store from 'portfolio/services/store';

export default class PagesShowRoute extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  async model(params: { page_id: string }) {
    const { content } = await this.store.request(getPage(params.page_id));

    return content;
  }
}
