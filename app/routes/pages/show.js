import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import SetHeadTags from 'portfolio/mixins/set-head-tags';

export default Route.extend(SetHeadTags, {
  model(params) {
    return get(this, 'store').query('page', {filter: { slug: params.page_slug }})
      .then((pages) => {
        return pages.get('firstObject');
      });
  },

  afterModel(model) {
    set(this, 'metaTitle', get(model, 'title') + ' | Christoph Wiedenmann');
    set(this, 'metaDescription', get(model, 'content').replace(/(<([^>]+)>)/ig,'') );
    set(this, 'metaType', 'article');

    this.setHeadTags(model);
  },

  serialize(model){
    return {
      page_slug: get(model, 'slug')
    };
  },
});
