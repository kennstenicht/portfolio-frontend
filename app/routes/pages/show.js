import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';

export default class PagesShowRoute extends Route {
  // Services
  @service headData;


  // Hooks
  model(params) {
    return this.store.query('page', {
      filter: {
        slug: params.page_slug
      }
    })
    .then((pages) => {
      return pages.get('firstObject');
    });
  }

  afterModel(model) {
    if(model) {
      this.headData.routeMetaTags = {
        title: model.title,
        description: model.content,
        type: 'article',
      }
    } else {
      throw {
        code: 404,
        message: 'not found'
      };
    }
  }

  serialize(model){
    return {
      page_slug: model.slug
    };
  }
}
