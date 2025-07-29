import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';

import { modifier } from 'ember-modifier';
import t from 'ember-intl/helpers/t';
import CookiesService from 'ember-cookies/services/cookies';

import { windowOn } from 'portfolio/modifiers/window-on';
import { bem } from 'portfolio/helpers/bem';
import buttonStyle from 'portfolio/assets/styles/objects/button.module.css';

import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
}

export default class ApplicationCookieNoticeComponent extends Component<Signature> {
  // Services
  @service declare cookies: CookiesService;

  // Defaults
  @tracked allowAnalyseCookies = false;
  @tracked allowMarketingCookies = false;
  @tracked isVisible = false;

  // Functions
  allowAllCookies = () => {
    this.allowAnalyseCookies = true;

    this.saveSettings();
  };

  checkHash = () => {
    if (location.hash == '#change-cookie-settings') {
      this.isVisible = true;

      location.hash = '';
    }
  };

  getCookieWithFallback = (cookie: string, fallback: string) => {
    if (!this.cookies.exists(cookie)) {
      this.cookies.write(cookie, fallback);
    }

    return this.cookies.read(cookie) == 'true';
  };

  saveSettings = () => {
    this.cookies.write('allow_analyse_cookies', this.allowAnalyseCookies);
    this.cookies.write('hide_cookie_notice', true);

    this.isVisible = false;
  };

  setupConsent = modifier(() => {
    if (!this.cookies.exists('hide_cookie_notice')) {
      this.isVisible = true;
    }

    this.allowAnalyseCookies =
      this.cookies.read('allow_analyse_cookies') == 'true';
  });

  toggleAnalyseCookies = (event: Event) => {
    const target = event.target as HTMLInputElement;

    this.allowAnalyseCookies = target.checked;
  };

  // Template
  <template>
    <div
      class={{bem styles (hash is-visible=this.isVisible)}}
      {{this.setupConsent}}
      {{windowOn "hashchange" this.checkHash}}
      ...attributes
    >
      <div class={{bem styles "header"}}>
        {{t "cookieNotice.headline"}}
      </div>
      <div class={{bem styles "content"}}>
        <div class={{bem styles "message"}}>
          {{t "cookieNotice.message" htmlSafe=true}}
        </div>
        <div class={{bem styles "settings"}}>
          <div class={{bem styles "option"}}>
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
          <div class={{bem styles "option"}}>
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
          <div class={{bem styles "spacer"}}></div>
          <button
            class="{{bem styles 'button'}} {{bem buttonStyle 'default'}}"
            type="button"
            {{on "click" this.saveSettings}}
          >
            {{t "cookieNotice.allowSelectedCookies"}}
          </button>
          <button
            class="{{bem styles 'button'}} {{bem buttonStyle 'default'}}"
            type="button"
            {{on "click" this.allowAllCookies}}
          >
            {{t "cookieNotice.allowAllCookies"}}
          </button>
        </div>
      </div>
    </div>
  </template>
}
