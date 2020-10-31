import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/session';

export default class LoginRoute extends Route {
  // Services
  @service session!: SessionService;


  // Hooks
  beforeModel() {
    this.session.prohibitAuthentication('admin.projects');
  }
}
