import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash, fn } from '@ember/helper';
import { service } from '@ember/service';
import RouterService from '@ember/routing/router-service';

import { t } from 'ember-intl';
import IntlService from 'ember-intl/services/intl';

import windowOn from 'portfolio/modifiers/window-on';
import { bem } from 'portfolio/helpers/bem';
import HeadDataService from 'portfolio/services/head-data';

import styles from './styles.module.css';
import Header from './header';
import Footer from './footer';
import CookieNotice from './cookie-notice';

interface Signature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export default class ApplicationComponent extends Component<Signature> {
  // Services
  @service declare headData: HeadDataService;
  @service declare intl: IntlService;
  @service declare router: RouterService;

  // Defaults
  @tracked showCookieNotice = false;
  @tracked isNavigationOpen = false;

  // Getter and setter
  get urlSegments(): string {
    if (this.router.currentRouteName === 'error') {
      return 'error';
    }
    const currentUrl = this.router.currentURL ?? '';

    let segments = currentUrl
      .substring(1)
      .split('/')
      .filter((n) => n);

    return segments[segments.length - 1] ?? 'default';
  }

  // Functions
  changeMetaTitle = (title: string) => {
    this.headData.blurTitle = title;
  };

  checkHash = () => {
    if (location.hash == '#change-cookie-settings') {
      this.toggleCookieNotice();

      location.hash = '';
    }
  };

  setIsNavigationOpen = (isOpen: boolean) => {
    this.isNavigationOpen = isOpen;
  };

  toggleCookieNotice = () => {
    this.showCookieNotice = !this.showCookieNotice;
  };

  // Template
  <template>
    <div
      class={{bem
        styles
        (hash style=this.urlSegments navigation-is-open=this.isNavigationOpen)
      }}
      {{windowOn "haschange" this.checkHash}}
      {{windowOn
        "blur"
        (fn this.changeMetaTitle (t "application.meta.blurTitle"))
      }}
      {{windowOn "focus" (fn this.changeMetaTitle "")}}
      ...attributes
    >
      <Header
        @isNavigationOpen={{this.isNavigationOpen}}
        @setIsNavigationOpen={{this.setIsNavigationOpen}}
      />

      <main class={{bem styles "content"}}>
        {{yield}}
      </main>

      <CookieNotice
        @showCookieNotice={{this.showCookieNotice}}
        @toggleCookieNotice={{this.toggleCookieNotice}}
      />
      <Footer />

      <div class={{bem styles "frame"}}></div>
    </div>
  </template>
}
