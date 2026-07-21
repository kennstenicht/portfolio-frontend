import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import ProjectModel from 'portfolio/models/project';

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
    return this.store.findRecord<ProjectModel>('project', id);
  }
}
