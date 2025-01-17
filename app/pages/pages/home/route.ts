import PageModel from 'portfolio/models/page';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';

export default class PagesHome extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  buildRouteInfoMetadata() {
    return {
      metaTags(model: PageModel) {
        return {
          title: model.metaTitle || model.metaTitleFallback,
          description: model.metaDescription || model.metaDescriptionFallback,
          type: 'article',
        };
      },
    };
  }

  model(): Promise<PageModel> {
    return this.store.findRecord('page', 'home');
  }
}
