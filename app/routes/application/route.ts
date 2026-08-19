import Route from '@ember/routing/route';
import { service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import translationsForDe from 'virtual:ember-intl/translations/de';
import translationsForEn from 'virtual:ember-intl/translations/en';

import { formats } from 'portfolio/ember-intl';

export default class ApplicationRoute extends Route {
  // Services
  @service declare intl: IntlService;

  // Hooks
  beforeModel() {
    // Setup intl
    this.intl.addTranslations('en', translationsForEn);
    this.intl.addTranslations('de', translationsForDe);
    this.intl.setFormats(formats);
    this.intl.setLocale('en');
  }
}
