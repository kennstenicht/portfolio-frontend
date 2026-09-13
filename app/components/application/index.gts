import { fn, hash } from '@ember/helper';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import IntlService from 'ember-intl/services/intl';

import { windowOn } from 'portfolio/modifiers/window-on';
import { getBem } from 'portfolio/utils/get-bem';

import CookieNotice from './cookie-notice';
import Footer from './footer';
import Header from './header';
import styles from './styles.module.css';

export interface ApplicationSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const bem = getBem(styles);

export default class Application extends Component<ApplicationSignature> {
  // Services
  @service declare intl: IntlService;
  @service declare router: RouterService;

  // Page theme
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

  // Navigation
  @tracked isNavigationOpen = false;

  setIsNavigationOpen = (isOpen: boolean) => {
    this.isNavigationOpen = isOpen;
  };

  // Blur-title
  previousTitle = '';

  changeMetaTitle = (title: string) => {
    if (title) {
      // Window lost focus: stash the real title and show the teaser.
      this.previousTitle = document.title;
      document.title = title;
    } else if (this.previousTitle) {
      // Window regained focus: restore the real title.
      document.title = this.previousTitle;
    }
  };

  // Template
  <template>
    <div
      class={{bem
        (hash style=this.urlSegments navigation-is-open=this.isNavigationOpen)
      }}
      data-test-application
      {{windowOn
        "blur"
        (fn this.changeMetaTitle (t "route.application.meta.blurTitle"))
      }}
      {{windowOn "focus" (fn this.changeMetaTitle "")}}
      ...attributes
    >

      <div class={{bem "content"}} data-test-content>
        <Header
          @isNavigationOpen={{this.isNavigationOpen}}
          @setIsNavigationOpen={{this.setIsNavigationOpen}}
        />
        <main data-test-main>
          {{yield}}
        </main>
        <Footer @isNavigationOpen={{this.isNavigationOpen}} />
      </div>

      <CookieNotice />

      <div class={{bem "frame"}} data-test-frame></div>
    </div>
  </template>
}
