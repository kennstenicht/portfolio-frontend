import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import { schedule } from '@ember/runloop';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import IntlService from 'ember-intl/services/intl';
import translationsForDe from 'virtual:ember-intl/translations/de';
import translationsForEn from 'virtual:ember-intl/translations/en';

import { formats } from 'portfolio/ember-intl';
import type PixelOverlayService from 'portfolio/services/pixel-overlay';

export default class ApplicationRoute extends Route {
  // Services
  @service declare intl: IntlService;
  @service declare pixelOverlay: PixelOverlayService;
  @service declare router: RouterService;

  // Setup
  beforeModel() {
    this.intl.addTranslations('en', translationsForEn);
    this.intl.addTranslations('de', translationsForDe);
    this.intl.setFormats(formats);
    this.intl.setLocale('en');

    if (!import.meta.env.SSR) {
      this.router.on('routeWillChange', this.routeWillChange);
    }
  }

  // Route changes
  // Aborting a transition announces it again, already aborted.
  routeWillChange = (transition: Transition) => {
    if (!transition.from || transition.isAborted || this.#isRetrying) {
      return;
    }

    // The cells grow out of the clicked link, so a route change without one
    // (back and forward, or a link that morphs) keeps the view transition.
    if (this.pixelOverlay.clickOrigin) {
      void this.coverRouteChange.perform(transition);
      return;
    }

    // Navigating on without a click while the cells cover cancels that cover,
    // so the page is revealed here.
    if (this.coverRouteChange.isRunning) {
      void this.coverRouteChange.cancelAll();
      void this.pixelOverlay.reveal('route');
    }

    this.startViewTransition(transition);
  };

  // The native view transition is skipped here: its named snapshots render in
  // the top layer and would morph on top of the cells. Restartable, so a
  // click during a cover takes it over for the new route.
  coverRouteChange = task(
    { restartable: true },
    async (transition: Transition) => {
      transition.abort();

      await this.pixelOverlay.cover('route');
      await this.#retry(transition);
      await afterRender();

      void this.pixelOverlay.reveal('route');
    },
  );

  startViewTransition = (transition: Transition) => {
    if (!document.startViewTransition) {
      return;
    }

    transition.abort();

    const viewTransition = document.startViewTransition(async () => {
      await this.#retry(transition);
      await afterRender();
    });

    // A route change within the same frame skips this one for its own.
    viewTransition.ready.catch(() => {});
  };

  // The retried transition is a new one, announced before retry() returns,
  // so the flag never has to span an await.
  #isRetrying = false;

  #retry(transition: Transition) {
    this.#isRetrying = true;

    try {
      return transition.retry();
    } finally {
      this.#isRetrying = false;
    }
  }
}

function afterRender() {
  // eslint-disable-next-line ember/no-runloop
  return new Promise<void>((resolve) => schedule('afterRender', resolve));
}
