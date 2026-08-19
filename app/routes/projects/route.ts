import Route from '@ember/routing/route';
import { service } from '@ember/service';

import { getProjects } from 'portfolio/data/project';
import type Store from 'portfolio/services/store';

export default class ProjectsRoute extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  async model() {
    const { content } = await this.store.request(getProjects());

    return content;
  }
}
