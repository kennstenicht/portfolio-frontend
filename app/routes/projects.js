import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProjectsRoute extends Route {
  // Services
  @service swiper;


  // Hooks
  model() {
    return this.store.query('project', { sort: 'position' });
  }


  // Actions
  @action
  willTransition(transition) {
    if(transition.targetName.match(/^projects./i) == null) {
      this.swiper.position = 0;
    }
  }
}
