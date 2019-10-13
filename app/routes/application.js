import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default class ApplicationRoute extends Route.extend(
  ApplicationRouteMixin,
) {
  // Services
  @service session
  @service intl
  @service headData


  // Getter and setter
  get routeAfterAuthentication() {
    return 'admin.projects'
  }

  get routeIfAlreadyAuthenticated() {
    return 'admin.projects'
  }


  // Hooks
  beforeModel() {
    // TODO: Add language switch
    this.intl.setLocale('de');
    this.headData.locale = 'de';
  }
}
