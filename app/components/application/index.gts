import { fn, hash } from '@ember/helper';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import IntlService from 'ember-intl/services/intl';

import { bem } from 'portfolio/helpers/bem';
import { windowOn } from 'portfolio/modifiers/window-on';
import HeadDataService from 'portfolio/services/head-data';

import CookieNotice from './cookie-notice';
import Footer from './footer';
import Header from './header';
import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
  Args: null;
}

export default class ApplicationComponent extends Component<Signature> {
  // Services
  @service declare headData: HeadDataService;
  @service declare intl: IntlService;
  @service declare router: RouterService;

  // Defaults
  @tracked isNavigationOpen = false;

  // Getter and setter
  get urlSegments(): string {
    if (this.router.currentRouteName === 'error') {
      return 'error';
    }

    const currentUrl = this.router.currentURL ?? '';

    const segments = currentUrl
      .substring(1)
      .split('/')
      .filter((n) => n);

    return segments[segments.length - 1] ?? 'default';
  }

  // Functions
  changeMetaTitle = (title: string) => {
    this.headData.blurTitle = title;
  };

  setIsNavigationOpen = (isOpen: boolean) => {
    this.isNavigationOpen = isOpen;
  };

  // Template
  <template>
    <div
      class={{bem
        styles
        (hash style=this.urlSegments navigation-is-open=this.isNavigationOpen)
      }}
      {{windowOn
        "blur"
        (fn this.changeMetaTitle (t "route.application.meta.blurTitle"))
      }}
      {{windowOn "focus" (fn this.changeMetaTitle "")}}
      ...attributes
    >

      <div class={{bem styles "content"}}>
        <Header
          @isNavigationOpen={{this.isNavigationOpen}}
          @setIsNavigationOpen={{this.setIsNavigationOpen}}
        />
        <main>
          {{yield}}
        </main>
        <Footer @isNavigationOpen={{this.isNavigationOpen}} />
      </div>

      <CookieNotice />

      <div class={{bem styles "frame"}}></div>
    </div>
  </template>
}
