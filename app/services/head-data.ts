import RouterService from '@ember/routing/router-service';
import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import IntlService from 'ember-intl/services/intl';

import ENV from 'portfolio/config/environment';

interface MetaTags {
  [key: string]: string | null;
}

interface RouteMetadata {
  metaTags?: (model: Record<string, unknown>, env: typeof ENV) => MetaTags;
}

interface CurrentRouteInfo {
  attributes: Record<string, unknown> | null;
  metadata: RouteMetadata | null;
}

export default class HeadDataService extends Service {
  // Services
  @service declare intl: IntlService;
  @service declare router: RouterService;

  // Defaults
  @tracked fallbackMetaTags: MetaTags = {};
  @tracked blurTitle = '';

  // Getter and Setter
  get translationMetaTags() {
    const metaTags: MetaTags = {};

    ['title', 'description'].forEach((key) => {
      const translation = this._getTranslation(key);

      if (translation) {
        metaTags[key] = translation;
      }
    });

    return metaTags;
  }

  get routeMetaTags(): MetaTags {
    const currentRoute = this.router
      .currentRoute as unknown as CurrentRouteInfo | null;
    const model = currentRoute?.attributes;
    const metadata = currentRoute?.metadata;

    if (!model) {
      return {};
    }

    if (metadata?.metaTags) {
      return metadata.metaTags(model, ENV);
    }

    return {};
  }

  get metaTags() {
    return {
      ...this.fallbackMetaTags,
      ...this.translationMetaTags,
      ...this.routeMetaTags,
    };
  }

  get title() {
    const title = `${this.metaTags.title} | ${this.company.name}`.toLowerCase();
    const blurTitle = this.blurTitle.toLowerCase();

    return blurTitle || title;
  }

  get description() {
    return this.metaTags.description?.toLowerCase();
  }

  get image() {
    return this.metaTags.image;
  }

  get type() {
    return this.metaTags.type;
  }

  get structuredData() {
    if (!this.metaTags.structuredData) {
      return null;
    }

    return JSON.stringify(this.metaTags.structuredData);
  }

  get locale() {
    return this.intl.primaryLocale || 'de';
  }

  get url() {
    return this.router.currentURL;
  }

  get company() {
    return ENV.company;
  }

  // Functions
  _getTranslation(type: string) {
    const currentRouteName = this.router.currentRouteName?.split('.') ?? [];

    // Check if translation exists for route or any parent route
    for (let x = currentRouteName.length; x > 0; x--) {
      const path = `route.${currentRouteName.slice(0, x).join('.')}.meta.${type}`;

      if (this.intl.exists(path)) {
        return this.intl.t(path);
      }
    }

    return '';
  }
}
