import Route from '@ember/routing/route';
import { set } from '@ember/object';
import SetHeadTags from 'portfolio/mixins/set-head-tags';

export default class PagesShowRoute extends Route.extend(SetHeadTags) {
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
    set(this, 'metaTitle', model.title + ' | Christoph Wiedenmann');
    set(this, 'metaDescription', model.content.replace(/(<([^>]+)>)/ig,'') );
    set(this, 'metaType', 'article');

    this.setHeadTags(model);
  }

  serialize(model){
    return {
      page_slug: model.slug
    };
  }
}
