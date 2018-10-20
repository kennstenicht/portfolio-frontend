import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  // Services
  session: service(),


  // Hooks
  beforeModel() {
    if(this.session.isAuthenticated) {
      this.transitionTo('admin');
    }
  }
});
