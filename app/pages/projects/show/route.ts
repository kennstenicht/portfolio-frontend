import Route from '@ember/routing/route';
import { service } from '@ember/service';

import { getProject } from 'portfolio/data/project';
import type Store from 'portfolio/services/store';

export default class ProjectsShowRoute extends Route {
  // Services
  @service declare store: Store;

  // Hooks
  async model(params: { id: string }) {
    const { content } = await this.store.request(getProject(params.id));

    return content;
  }
}
