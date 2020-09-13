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
    return 'admin.projects';
  }

  get routeIfAlreadyAuthenticated() {
    return 'admin.projects';
  }


  // Hooks
  constructor() {
    super(...arguments);

    this.intl.setLocale('de');

    this.headData.fallbackMetaTags = {
      title: this.intl.t('application.meta.title'),
      description: this.intl.t('application.meta.description'),
      image: '/assets/meta/sharing-image--default.jpg',
      type: 'website',
      structuredData: null,
    }
  }


}
