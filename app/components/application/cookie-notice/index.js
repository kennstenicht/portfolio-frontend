import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import styles from './styles.module.css';
import button from 'portfolio/assets/styles/objects/button.module.css';

export default class ApplicationCookieNoticeComponent extends Component {
  // Services
  @service cookies;


  // Hooks
  constructor() {
    super(...arguments);

    // if (!this.cookies.exists('hide_cookie_notice')) {
    //   this.args.toggleCookieNotice();
    // }
  }


  // Defaults
  styles = styles;
  button = button;

  // Getter and setter
  get allowAnalyseCookies() {
    return this.getCookieWithFallback('allow_analyse_cookies', false);
  }

  set allowAnalyseCookies(value) {
    this.cookies.write('allow_analyse_cookies', value);
  }

  get allowMarketingCookies() {
    return this.getCookieWithFallback('allow_marketing_cookies', false);
  }

  set allowMarketingCookies(value) {
    this.cookies.write('allow_marketing_cookies', value);
  }


  // Actions
  @action
  allowSelectedCookies() {
    this.saveSettings();
  }

  @action
  allowAllCookies() {
    this.allowAnalyseCookies = true;

    this.saveSettings();
  }


  // Functions
  getCookieWithFallback(cookie, fallback) {
    if (!this.cookies.exists(cookie)) {
      this.cookies.write(cookie, fallback);
    }

    return this.cookies.read(cookie) == 'true';
  }

  saveSettings() {
    this.cookies.write('hide_cookie_notice', true);
    this.args.toggleCookieNotice();
  }
}
