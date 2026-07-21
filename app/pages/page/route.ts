import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import PageModel from 'portfolio/models/page';

interface Params {
  page_id: string;
}

export default class PagesShowRoute extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  buildRouteInfoMetadata() {
    return {
      metaTags(model: PageModel) {
        return {
          title: model.metaTitle,
          description: model.metaDescription,
          type: 'article',
        };
      },
    };
  }

  model(params: Params) {
    return this.store.findRecord<PageModel>('page', params.page_id);
  }
}
