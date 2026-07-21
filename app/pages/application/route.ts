import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
// @ts-ignore
import MetricsService from 'ember-metrics/services/metrics';

import { formats } from 'portfolio/ember-intl';
import HeadDataService from 'portfolio/services/head-data';

export default class ApplicationRoute extends Route {
  // Services
  @service declare headData: HeadDataService;
  @service declare intl: IntlService;
  @service declare metrics: MetricsService;
  @service declare router: RouterService;

  // Hooks
  beforeModel() {
    // Setup intl
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

    // Setup ember metrics
    this.router.on('routeDidChange', () => {
      const page = this.router.currentURL;
      const title = this.router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }
}
