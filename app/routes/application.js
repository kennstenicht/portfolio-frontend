import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import ScrollControllerRouteMixin from 'ember-scrollmagic/mixins/scroll-controllers/route-mixin';
import SetHeadTags from '../mixins/set-head-tags';

export default Route.extend(ScrollControllerRouteMixin, SetHeadTags, {
  // Services
  session: service(),

  // Variables
  metaTitle: 'A berlin based Front-End Engenieer & UI/UX-Designer | Christoph Wiedenmann',
  metaDescription: 'ag-prop ist ein Berliner Digitalstudio. Für unsere Kunden entwickeln wir digitale Produkte, Services und Kommunikationsstrategien.',
  metaImage: 'images/default_sharing.jpg',

  // Actions
  actions: {
    accessDenied() {
      this.transitionTo('admin.login');
    },

    transitionTo(route, model) {
      if(model) {
        this.transitionTo(route, model);
      } else {
        this.transitionTo(route);
      }
    }
  },
});
