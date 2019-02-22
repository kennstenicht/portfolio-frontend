import Route from '@ember/routing/route';
import { set } from '@ember/object';
import SetHeadTags from '../../mixins/set-head-tags';

export default class ProjectsShowRoute extends Route.extend(SetHeadTags) {
  // Hooks
  model(params) {
    return this.modelFor('projects')
      .findBy('slug', params.project_slug);
  }

  afterModel(model) {
    set(this, 'metaTitle', model.title + ' » ' + model.subtitle + ' | Christoph Wiedenmann');
    set(this, 'metaDescription', model.excerpt.replace(/(<([^>]+)>)/ig,'') );
    set(this, 'metaImage', `images/projects/${model.slug}/${model.slug}_preview.jpg`);
    set(this, 'metaType', 'article');

    this.setHeadTags(model);
  }

  serialize(model){
    return {
      project_slug: model.slug
    };
  }
}
