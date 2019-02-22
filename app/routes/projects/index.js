import Route from '@ember/routing/route';
import SetHeadTags from '../../mixins/set-head-tags';

export default class ProjectsIndexRoute extends Route.extend(SetHeadTags) {
  // Defaults
  metaTitle = 'Projekte | Christoph Wiedenmann';
  metaDescription = 'Lorem ipsum';


  // Hooks
  model() {
    return this.modelFor('projects');
  }
}
