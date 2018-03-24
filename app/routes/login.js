import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  // Services
  session: service(),


  // Hooks
  beforeModel() {
    if(get(this, 'session.isAuthenticated')) {
      this.transitionTo('admin');
    }
  }
});
