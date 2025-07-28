import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import type ProjectModel from 'portfolio/models/project';

export default class ProjectsRoute extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  model() {
    return this.store.findAll<ProjectModel>('project');
  }
}
