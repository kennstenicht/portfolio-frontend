import Route from '@ember/routing/route';
import { service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import translationsForDe from 'virtual:ember-intl/translations/de';
import translationsForEn from 'virtual:ember-intl/translations/en';

import { formats } from 'portfolio/ember-intl';
import HeadDataService from 'portfolio/services/head-data';

export default class ApplicationRoute extends Route {
  // Services
  @service declare headData: HeadDataService;
  @service declare intl: IntlService;

  // Hooks
  beforeModel() {
    // Setup intl
    this.intl.addTranslations('en', translationsForEn);
    this.intl.addTranslations('de', translationsForDe);
    this.intl.setFormats(formats);
    this.intl.setLocale('en');

    // Setup head data fallback tags
    this.headData.fallbackMetaTags = {
      title: this.intl.t('route.application.meta.title'),
      description: this.intl.t('route.application.meta.description'),
      image: '/assets/meta/sharing-image--default.jpg',
      type: 'website',
      structuredData: null,
    };
  }
}
