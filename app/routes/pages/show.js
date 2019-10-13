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
    this.headData.title = `${model.title} | christoph wiedenmann`;
    this.headData.description = model.content;
    this.headData.type = 'article';
  }

  serialize(model){
    return {
      page_slug: model.slug
    };
  }
}
