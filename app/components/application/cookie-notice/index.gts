import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import CookiesService from 'ember-cookies/services/cookies';
import t from 'ember-intl/helpers/t';
import { modifier } from 'ember-modifier';

import buttonStyle from 'portfolio/assets/styles/objects/button.module.css';
import { windowOn } from 'portfolio/modifiers/window-on';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

export interface ApplicationCookieNoticeSignature {
  Element: HTMLDivElement;
}

const bem = getBem(styles);
const buttonBem = getBem(buttonStyle);

export default class ApplicationCookieNotice extends Component<ApplicationCookieNoticeSignature> {
  // Services
  @service declare cookies: CookiesService;

  // Visibility
  @tracked isVisible = false;

  checkHash = () => {
    if (location.hash == '#change-cookie-settings') {
      this.isVisible = true;

      location.hash = '';
    }
  };

  // Consent
  @tracked allowAnalyseCookies = false;
  @tracked allowMarketingCookies = false;

  setupConsent = modifier(() => {
    if (!this.cookies.exists('hide_cookie_notice')) {
      this.isVisible = true;
    }

    this.allowAnalyseCookies =
      this.cookies.read('allow_analyse_cookies') == 'true';
  });

  getCookieWithFallback = (cookie: string, fallback: string) => {
    if (!this.cookies.exists(cookie)) {
      this.cookies.write(cookie, fallback);
    }

    return this.cookies.read(cookie) == 'true';
  };

  toggleAnalyseCookies = (event: Event) => {
    const target = event.target as HTMLInputElement;

    this.allowAnalyseCookies = target.checked;
  };

  allowAllCookies = () => {
    this.allowAnalyseCookies = true;

    this.saveSettings();
  };

  saveSettings = () => {
    this.cookies.write('allow_analyse_cookies', this.allowAnalyseCookies);
    this.cookies.write('hide_cookie_notice', true);

    this.isVisible = false;
  };

  // Template
  <template>
    <div
      class={{bem (hash is-visible=this.isVisible)}}
      data-test-cookie-notice
      {{this.setupConsent}}
      {{windowOn "hashchange" this.checkHash}}
      ...attributes
    >
      <div class={{bem "header"}}>
        {{t "cookieNotice.headline"}}
      </div>
      <div class={{bem "content"}}>
        <div class={{bem "message"}}>
          {{t "cookieNotice.message" htmlSafe=true}}
        </div>
        <div class={{bem "settings"}}>
          <div class={{bem "option"}}>
            <input
              id="allow-required-cookies"
              disabled={{true}}
              name="allow-required-cookies"
              type="checkbox"
              checked={{true}}
            />
            <label for="allow-required-cookies">
              {{t "cookieNotice.options.required"}}
            </label>
          </div>
          <div class={{bem "option"}}>
            <input
              id="allow-analyse-cookies"
              name="allow-analyse-cookies"
              type="checkbox"
              checked={{this.allowAnalyseCookies}}
              {{on "change" this.toggleAnalyseCookies}}
            />
            <label for="allow-analyse-cookies">
              {{t "cookieNotice.options.analyse"}}
            </label>
          </div>
          <div class={{bem "spacer"}}></div>
          <button
            class="{{bem 'button'}} {{buttonBem 'default'}}"
            type="button"
            data-test-allow-selected-cookies
            {{on "click" this.saveSettings}}
          >
            {{t "cookieNotice.allowSelectedCookies"}}
          </button>
          <button
            class="{{bem 'button'}} {{buttonBem 'default'}}"
            type="button"
            data-test-allow-all-cookies
            {{on "click" this.allowAllCookies}}
          >
            {{t "cookieNotice.allowAllCookies"}}
          </button>
        </div>
      </div>
    </div>
  </template>
}
