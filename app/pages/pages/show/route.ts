import PageModel from 'portfolio/models/page';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  id: string;
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

  model({ id }: Params) {
    return this.store.findRecord('page', id);
  }

  afterModel(model: PageModel) {
    if (!model) {
      throw {
        code: 404,
        message: 'not found',
      };
    }
  }
}
