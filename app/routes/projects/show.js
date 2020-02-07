import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';

export default class ProjectsShowRoute extends Route {
  // Services
  @service headData;
  @service fastboot;


  // Hooks
  model(params) {
    return this.modelFor('projects')
      .findBy('slug', params.project_slug);
  }

  afterModel(model) {
    if(model) {
      this.metaTags = {
        title: model.metaTitle || model.metaTitleFallback,
        description: model.metaDescription || model.metaDescriptionFallback,
        type: 'article',
        image: `images/projects/${model.slug}/${model.slug}_preview.jpg`
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
      project_slug: model.slug
    };
  }
}
