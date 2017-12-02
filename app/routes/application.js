import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import ScrollControllerRouteMixin from 'ember-scrollmagic/mixins/scroll-controllers/route-mixin';

export default Route.extend(ScrollControllerRouteMixin, {
  // Services
  session: service(),

  // Hooks
  beforeModel: function() {
    return get(this, 'session').fetch().catch(function() {});
  },

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
