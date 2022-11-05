import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import SwiperService from 'portfolio/services/swiper';

export default class ProjectsRoute extends Route {
  // Services
  @service declare store: Store;
  @service declare swiper: SwiperService;


  // Hooks
  model() {
    return this.store.findAll('project');
  }
}
