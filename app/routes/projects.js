import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import SetHeadTags from '../mixins/set-head-tags';

export default Route.extend(SetHeadTags, {
  // Services
  swiper: service(),

  // Meta properties
  metaTitle: 'projekte << christoph wiedenmann',
  metaDescription: 'Lorem ipsum',

  model() {
    return this.store.query('project', { sort: 'position' });
  },

  // Actions
  actions: {
    willTransition(transition) {
      if(transition.targetName.match(/^projects./i) == null) {
        set(this, 'swiper.position', 0);
      }
    }
  }
});
