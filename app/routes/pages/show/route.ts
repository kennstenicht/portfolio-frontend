import PageModel from 'portfolio/models/page';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import HeadDataService from 'portfolio/services/head-data';

interface Params {
  page_slug: string
}

export default class PagesShowRoute extends Route {
  // Services
  @service headData!: HeadDataService;
  @service store!: Store;


  // Defaults
  metaTags = {};


  // Hooks
  async model({ page_slug }: Params) {
    let pages = await this.store.query('page', {
      filter: {
        slug: page_slug
      }
    });

    return pages.get('firstObject');
  }

  afterModel(model: PageModel) {
    if(model) {
      this.metaTags = {
        title: model.metaTitle || model.metaTitleFallback,
        description: model.metaDescription || model.metaDescriptionFallback,
        type: 'article',
      }
    } else {
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
