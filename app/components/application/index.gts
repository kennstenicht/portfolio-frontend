import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { hash } from '@ember/helper';
import { inject as service } from '@ember/service';
import RouterService from '@ember/routing/router-service';
import { registerDestructor } from '@ember/destroyable';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import Header from './header';
import Footer from './footer';
import CookieNotice from './cookie-notice';

interface Signature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
  Args: {};
}

export default class ApplicationComponent extends Component<Signature> {
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

    let segments = this.router.currentURL
      .substring(1)
      .split('/')
      .filter((n) => n);

    return segments[segments.length - 1] ?? 'default';
  }

  // Hooks
  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    window.addEventListener('hashchange', this.checkHash.bind(this), false);

    registerDestructor(this, () => {
      window.removeEventListener(
        'hashchange',
        this.checkHash.bind(this),
        true
      );
    });
  }


  // Functions
  checkHash() {
    if (location.hash == '#change-cookie-settings') {
      this.toggleCookieNotice();

      location.hash = '';
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
      class={{bem
        styles
        (hash
          style=this.urlSegments navigation-is-open=this.isNavigationOpen
        )
      }}
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
