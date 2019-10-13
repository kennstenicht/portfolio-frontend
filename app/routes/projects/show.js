import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';

export default class ProjectsShowRoute extends Route {
  // Services
  @service headData;


  // Hooks
  model(params) {
    return this.modelFor('projects')
      .findBy('slug', params.project_slug);
  }

  afterModel(model) {
    this.headData.title = `${model.title} » ${model.subtitle} | christoph wiedenmann`;
    this.headData.description = model.excerpt;
    this.headData.type = 'article';
    this.headData.image = `images/projects/${model.slug}/${model.slug}_preview.jpg`;
  }

  serialize(model){
    return {
      project_slug: model.slug
    };
  }
}
