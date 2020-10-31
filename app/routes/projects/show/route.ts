import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import HeadDataService from 'portfolio/services/head-data';
import ProjectsModel from 'portfolio/models/project'
import ProjectShowController from 'portfolio/routes/projects/show/controller';
import FastbootService from 'ember-cli-fastboot/services/fastboot';
import { A } from '@ember/array';

interface Params {
  project_slug: string
}

export default class ProjectsShowRoute extends Route {
  // Services
  @service headData!: HeadDataService;
  @service fastboot!: FastbootService;


  // Defaults
  metaTags = {};


  // Hooks
  model({ project_slug }: Params) {
    let projects = this.modelFor('projects') as ProjectsModel[];

    return projects.findBy('slug', project_slug);
  }

  afterModel(model: ProjectsModel) {
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

  serialize(model: ProjectsModel){
    return {
      project_slug: model.slug
    };
  }
}
