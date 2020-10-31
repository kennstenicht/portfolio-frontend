import PageModel from 'portfolio/models/page';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  page_slug: string
}

export default class PagesShowRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  buildRouteInfoMetadata() {
    return {
      metaTags(model: PageModel) {
        return {
          title: model.metaTitle || model.metaTitleFallback,
          description: model.metaDescription || model.metaDescriptionFallback,
          type: 'article',
        };
      }
    }
  }

  async model({ page_slug }: Params) {
    let pages = await this.store.query('page', {
      filter: {
        slug: page_slug
      }
    });

    return pages.get('firstObject');
  }

  afterModel(model: PageModel) {
    if(!model) {
      throw {
        code: 404,
        message: 'not found'
      };
    }
  }

  serialize(model: PageModel){
    return {
      page_slug: model.slug
    };
  }
}
