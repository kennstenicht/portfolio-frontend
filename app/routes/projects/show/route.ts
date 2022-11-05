import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ProjectsModel from 'portfolio/models/project'
import FastbootService from 'ember-cli-fastboot/services/fastboot';
import ArrayProxy from '@ember/array/proxy';

interface Params {
  id: string
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
          image: `images/projects/${model.id}/${model.id}_preview.jpg`
        };
      }
    }
  }

  model({ id }: Params) {
    const projects = this.modelFor('projects') as ArrayProxy<ProjectsModel>;

    return projects.findBy('id', id);
  }

  afterModel(model: ProjectsModel) {
    if(!model) {
      throw {
        code: 404,
        message: 'not found'
      };
    }
  }
}
