import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { hash } from '@ember/helper';
import { inject as service } from '@ember/service';
import RouterService from '@ember/routing/router-service';
import styles from './styles.module.css';
import bem from 'portfolio/helpers/bem';
import Header from './header';
import Footer from './footer';
import CookieNotice from './cookie-notice';

interface Signature {
  Element: HTMLElement,
  Blocks: {
    default: []
  },
  Args: {}
}

export default class AppLicationComponent extends Component<Signature> {
  // Services
  @service declare router: RouterService;


  // Defaults
  @tracked showCookieNotice: boolean = false;
  @tracked isNavigationOpen: boolean = false;


  // Getter and setter
  get urlSegments(): string {
    if (this.router.currentRouteName === 'error') {
      return 'error';
    }

    let segments = this.router
      .currentURL
      .substring(1)
      .split('/')
      .filter(n => n)

      return segments[segments.length-1];
  }


  // Hooks
  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    window.addEventListener('hashchange', this.checkHash.bind(this), false);
  }

  willDestroy() {
    window.removeEventListener('hashchange', this.checkHash.bind(this), true);
  }


  checkHash() {
    if (location.hash == '#change-cookie-settings') {
      this.toggleCookieNotice();

      location.hash = ''
    }
  }


  // Actions
  @action
  toggleCookieNotice() {
    this.showCookieNotice = !this.showCookieNotice;
  }

  @action
  toggleNavigation() {
    this.isNavigationOpen = !this.isNavigationOpen;
  }


  // Template
  <template>
    <div
      class={{bem styles modifiers=(hash
        style=this.urlSegments
        navigation-is-open=this.isNavigationOpen
      )}}
      ...attributes
    >
      <Header
        @isNavigationOpen={{this.isNavigationOpen}}
        @toggleNavigation={{this.toggleNavigation}}
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
