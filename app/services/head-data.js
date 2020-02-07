import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default class HeadDataService extends Service {
  // Services
  @service router;
  @service intl;


  // Defaults
  @tracked fallbackMetaTags = {};
  @tracked blurTitle = '';

  // Getter and Setter
  get translationMetaTags() {
    let metaTags = {};

    ['title', 'description'].forEach((key) => {
      const translation = this._getTranslation(key);

      if(translation) {
        metaTags[key] = translation;
      }
    });

    return metaTags;
  }

  get routeMetaTags() {
    const routeName = this.router.currentRouteName;
    const currentRoute = getOwner(this).lookup(`route:${routeName}`);

    return currentRoute.metaTags || {};
  }

  get metaTags() {
    return {
      ...this.fallbackMetaTags,
      ...this.translationMetaTags,
      ...this.routeMetaTags
    };
  }

  get title() {
    let title = `${this.metaTags.title} | Christoph Wiedenmann`.toLowerCase();
    let blurTitle = this.blurTitle.toLowerCase();

    return blurTitle || title;
  }

  get description() {
    return this.metaTags.description.toLowerCase();
  }

  get image() {
    return this.metaTags.image;
  }

  get type() {
    return this.metaTags.type;
  }

  get structuredData() {
    return this.metaTags.structuredData;
  }

  get locale() {
    return this.intl.primaryLocale || 'de';
  }

  get url() {
    return this.router.currentURL;
  }


  // Hooks
  constructor() {
    super(...arguments);

    // Change title if window is not in focus
    window.onblur = () => this.blurTitle = this.intl.t('application.meta.blurTitle');
    window.onfocus = () => this.blurTitle = '';
  }


  // Functions
  _getTranslation(type) {
    let currentRouteName = this.router.currentRouteName.split('.');

    // Check if translation exists for route or any parent route
    for(let x = currentRouteName.length; x > 0; x--) {
      let path = `${currentRouteName.slice(0, x).join('.')}.meta.${type}`;

      if(this.intl.exists(path)) {
        return this.intl.t(path);
      }
    }
  }
}
