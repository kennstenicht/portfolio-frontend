import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import ProjectModel from 'portfolio/models/project';

export default class ProjectsShowRoute extends Route<ProjectModel> {
  // Services
  @service declare store: Store;

  // Hooks
  model(params: { id: string }) {
    return this.store.findRecord<ProjectModel>('project', params.id);
  }
}
