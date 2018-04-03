import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import SetHeadTags from '../../mixins/set-head-tags';

export default Route.extend(SetHeadTags, {
  model(params) {
    return this.modelFor('projects')
      .findBy('slug', params.project_slug);
  },

  afterModel(model) {
    set(this, 'metaTitle', get(model, 'title') + ' » ' + get(model, 'subtitle') + ' | Christoph Wiedenmann');
    set(this, 'metaDescription', get(model, 'excerpt').replace(/(<([^>]+)>)/ig,'') );
    set(this, 'metaImage', `images/projects/${get(model, 'slug')}/${get(model, 'slug')}_preview.jpg`);
    set(this, 'metaType', 'article');

    this.setHeadTags(model);
  },

  serialize(model){
    return {
      project_slug: get(model, 'slug')
    };
  },
});
