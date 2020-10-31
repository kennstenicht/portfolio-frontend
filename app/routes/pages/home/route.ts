import Route from '@ember/routing/route';
import PageModel from 'portfolio/models/page';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

export default class PagesHomeRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  async model() {
    let pages = await this.store.query('page', {
      filter: {
        slug: 'home'
      }
    });

    return pages.get('firstObject');
  }

  serialize(model: PageModel){
    return {
      page_slug: model.slug
    };
  }
}
