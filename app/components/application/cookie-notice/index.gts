import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { Input } from '@ember/component';
import { hash } from '@ember/helper';
// @ts-ignore
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
// @ts-ignore
import CookiesService from 'ember-cookies/services/cookies';
// @ts-ignore
import MediaService from 'ember-responsive/services/media';
import { bem } from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import buttonStyle from 'portfolio/assets/styles/objects/button.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    showCookieNotice: boolean;
    toggleCookieNotice: () => void;
  };
}

export default class ApplicationCookieNoticeComponent extends Component<Signature> {
  // Services
  @service declare cookies: CookiesService;
  @service declare media: MediaService;

  // Hooks
  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    // if (!this.cookies.exists('hide_cookie_notice')) {
    //   this.args.toggleCookieNotice();
    // }
  }

  // Getter and setter
  get allowAnalyseCookies() {
    return this.getCookieWithFallback('allow_analyse_cookies', 'false');
  }

  set allowAnalyseCookies(value) {
    this.cookies.write('allow_analyse_cookies', value);
  }

  get allowMarketingCookies() {
    return this.getCookieWithFallback('allow_marketing_cookies', 'false');
  }

  set allowMarketingCookies(value) {
    this.cookies.write('allow_marketing_cookies', value);
  }

  // Functions
  @action
  allowSelectedCookies() {
    this.saveSettings();
  }

  @action
  allowAllCookies() {
    this.allowAnalyseCookies = true;

    this.saveSettings();
  }

  getCookieWithFallback(cookie: string, fallback: string) {
    if (!this.cookies.exists(cookie)) {
      this.cookies.write(cookie, fallback);
    }

    return this.cookies.read(cookie) == 'true';
  }

  saveSettings() {
    this.cookies.write('hide_cookie_notice', true);
    this.args.toggleCookieNotice();
  }

  // Template
  <template>
    <div class={{bem styles (hash is-visible=@showCookieNotice)}} ...attributes>
      <div class={{bem styles "header"}}>
        {{t "cookieNotice.headline"}}
      </div>
      <div class={{bem styles "content"}}>
        <div class={{bem styles "message"}}>
          {{t "cookieNotice.message" htmlSafe=true}}
        </div>
        <div class={{bem styles "settings"}}>
          <div class={{bem styles "option"}}>
            <Input
              id="allow-required-cookies"
              disabled={{true}}
              name="allow-required-cookies"
              @type="checkbox"
              @checked={{true}}
            />
            <label for="allow-required-cookies">
              {{t "cookieNotice.options.required"}}
            </label>
          </div>
          <div class={{bem styles "option"}}>
            <Input
              id="allow-analyse-cookies"
              name="allow-analyse-cookies"
              @type="checkbox"
              @checked={{this.allowAnalyseCookies}}
            />
            <label for="allow-analyse-cookies">
              {{t "cookieNotice.options.analyse"}}
            </label>
          </div>
          <div class={{bem styles "spacer"}}></div>
          <button
            class="{{bem styles 'button'}}
              {{bem
                buttonStyle
                (hash size=(if this.media.isDesktop "default" "full"))
              }}"
            type="button"
            {{on "click" this.allowSelectedCookies}}
          >
            {{t "cookieNotice.allowSelectedCookies"}}
          </button>
          <button
            class="{{bem styles 'button'}}
              {{bem
                buttonStyle
                (hash size=(if this.media.isDesktop "default" "full"))
              }}"
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
