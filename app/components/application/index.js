import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AppLicationComponent extends Component {
  // Services
  @service router;
  @service fastboot;
  @service flashMessages;


  // Defaults
  @tracked showCookieNotice = false;


  // Getter and setter
  get urlSegments() {
    let segments = this.router
      .currentURL
      .substring(1)
      .split('/')
      .filter(n => n)

    console.log(segments);
    return segments[segments.length-1];
  }


  // Hooks
  constructor() {
    super(...arguments);

    if (!this.fastboot.isFastBoot) {
      window.addEventListener('hashchange', this.checkHash.bind(this), false);
    }
  }

  willDestroy() {
    if (!this.fastboot.isFastBoot) {
      window.removeEventListener('hashchange', this.checkHash.bind(this), true);
    }
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
}
