import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import HeadDataService from 'portfolio/services/head-data';
import IntlService from 'ember-intl/services/intl';
import SessionService from 'ember-simple-auth/services/session';

export default class ApplicationRoute extends Route {
  // Services
  @service headData!: HeadDataService;
  @service intl!: IntlService;
  @service session!: SessionService;


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
