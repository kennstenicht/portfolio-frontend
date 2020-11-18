import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Transition from '@ember/routing/-private/transition';
import SwiperService from 'portfolio/services/swiper';

export default class ProjectsRoute extends Route {
  // Services
  @service swiper!: SwiperService;


  // Hooks
  model() {
    return this.store.query('project', { sort: 'position' });
  }


  // Actions
  @action
  willTransition(transition: Transition) {
    // if(transition.to.name.match(/^projects./i) == null) {
    //   this.swiper.position = 0;
    // }
  }
}
