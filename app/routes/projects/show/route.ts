import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ProjectsModel from 'portfolio/models/project'
import FastbootService from 'ember-cli-fastboot/services/fastboot';

interface Params {
  project_slug: string
}

export default class ProjectsShowRoute extends Route {
  // Services
  @service fastboot!: FastbootService;


  // Hooks
  buildRouteInfoMetadata() {
    return {
      metaTags(model: ProjectsModel) {
        return {
          title: model.metaTitle || model.metaTitleFallback,
          description: model.metaDescription || model.metaDescriptionFallback,
          type: 'article',
          image: `images/projects/${model.slug}/${model.slug}_preview.jpg`
        };
      }
    }
  }

  model({ project_slug }: Params) {
    let projects = this.modelFor('projects') as ProjectsModel[];

    return projects.findBy('slug', project_slug);
  }

  afterModel(model: ProjectsModel) {
    if(!model) {
      throw {
        code: 404,
        message: 'not found'
      };
    }
  }

  serialize(model: ProjectsModel){
    return {
      project_slug: model.slug
    };
  }
}
