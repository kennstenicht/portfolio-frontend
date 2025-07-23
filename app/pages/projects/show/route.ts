import Route from '@ember/routing/route';
import ProjectModel from 'portfolio/models/project';
import Store from '@ember-data/store';
import { service } from '@ember/service';

interface Params {
  id: string;
}

export default class ProjectsShowRoute extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  buildRouteInfoMetadata() {
    return {
      metaTags(model: ProjectModel) {
        return {
          title: model.metaTitle,
          description: model.metaDescription,
          type: 'article',
          image: `images/projects/${model.id}/${model.id}_preview.jpg`,
        };
      },
    };
  }

  model({ id }: Params) {
    return this.store.findRecord('project', id);
  }

  afterModel(model: ProjectModel) {
    if (!model) {
      throw {
        code: 404,
        message: 'not found',
      };
    }
  }
}
