import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import { schedule } from '@ember/runloop';
import { service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import translationsForDe from 'virtual:ember-intl/translations/de';
import translationsForEn from 'virtual:ember-intl/translations/en';

import { formats } from 'portfolio/ember-intl';

export default class ApplicationRoute extends Route {
  // Services
  @service declare intl: IntlService;
  @service declare router: RouterService;

  // Defaults
  #isRetrying = false;

  // Hooks
  beforeModel() {
    // Setup intl
    this.intl.addTranslations('en', translationsForEn);
    this.intl.addTranslations('de', translationsForDe);
    this.intl.setFormats(formats);
    this.intl.setLocale('en');

    if (!import.meta.env.SSR) {
      this.router.on('routeWillChange', this.startViewTransition);
    }
  }

  // Functions
  startViewTransition = (transition: Transition) => {
    if (!document.startViewTransition || !transition.from || this.#isRetrying) {
      return;
    }

    this.#isRetrying = true;
    transition.abort();

    void document.startViewTransition(async () => {
      try {
        await transition.retry();
        // eslint-disable-next-line ember/no-runloop
        await new Promise<void>((resolve) => schedule('afterRender', resolve));
      } finally {
        this.#isRetrying = false;
      }
    });
  };
}
