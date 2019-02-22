import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';
import SetHeadTags from '../mixins/set-head-tags';

export default class ProjectsRoute extends Route.extend(SetHeadTags) {
  // Services
  @service swiper;


  // Defaults
  metaTitle = 'projekte << christoph wiedenmann';
  metaDescription = 'Lorem ipsum';


  // Hooks
  model() {
    return this.store.query('project', { sort: 'position' });
  }


  // Actions
  @action
  willTransition(transition) {
    if(transition.targetName.match(/^projects./i) == null) {
      set(this, 'swiper.position', 0);
    }
  }
}
