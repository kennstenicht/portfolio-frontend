import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import type Owner from '@ember/owner';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { rawTimeout, task, timeout } from 'ember-concurrency';
import { t } from 'ember-intl';
import onKey from 'ember-keyboard/helpers/on-key';

import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';
import Metadata from 'portfolio/components/seo/metadata';
import { windowOn } from 'portfolio/modifiers/window-on';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

export interface ErrorTemplateSignature {
  Args: {
    model: Error;
  };
}

const COUNTDOWN_SECONDS = 50;
// The power-off animation in styles.module.css, plus a moment of black.
const POWER_OFF_DURATION = 1400 + 1200;

const bem = getBem(styles);
const wrapperBem = getBem(wrapperStyles);

export default class ErrorTemplate extends Component<ErrorTemplateSignature> {
  // Services
  @service declare router: RouterService;

  constructor(owner: Owner, args: ErrorTemplateSignature['Args']) {
    super(owner, args);

    if (!import.meta.env.SSR) {
      void this.countdown.perform();
    }
  }

  // Exception
  get path() {
    return this.router.currentURL ?? '/';
  }

  // Power off
  // Every way out of the page, other than the site's own navigation, ends in
  // the power-off.
  shutDown = () => {
    void this.powerOff.perform();
  };

  powerOff = task({ drop: true }, async () => {
    await timeout(POWER_OFF_DURATION);

    this.router.transitionTo('home');
  });

  // Terminate
  terminate = (event: KeyboardEvent) => {
    // Enter on a focused link or button already activates it.
    if (!(event.target as Element).closest('a, button')) {
      this.shutDown();
    }
  };

  // Restart
  // Ctrl+Alt+Del and Cmd+Opt+Esc never reach the page, the OS takes both. On
  // a Mac, Ctrl+Opt+Return is Maximize in Rectangle and Magnet, so the combo
  // echoes the Mac's own restart, Ctrl+Cmd+Power, instead.
  get isMac() {
    return !import.meta.env.SSR && /Mac|iPhone|iPad/.test(navigator.userAgent);
  }

  get restartCombo() {
    return this.isMac ? 'ctrl+meta+Enter' : 'ctrl+alt+Enter';
  }

  get restartKeys() {
    return this.isMac ? 'route.error.keys.mac' : 'route.error.keys.other';
  }

  // Countdown
  @tracked seconds = COUNTDOWN_SECONDS;
  @tracked isCountdownCancelled = false;

  // A raw timeout, off the run loop, so a test visiting a missing page settles
  // instead of waiting out the countdown.
  countdown = task(async () => {
    for (let seconds = COUNTDOWN_SECONDS; seconds > 0; seconds--) {
      this.seconds = seconds;
      await rawTimeout(1000);
    }

    this.shutDown();
  });

  // A held modifier is the start of the restart combo, and both buttons power
  // off anyway — neither should flash "cancelled" before the power-off.
  cancelCountdown = (event: Event) => {
    const isModified =
      event instanceof KeyboardEvent &&
      (event.ctrlKey || event.altKey || event.metaKey);

    if (isModified || (event.target as Element).closest('button')) {
      return;
    }

    if (this.countdown.isRunning) {
      void this.countdown.cancelAll();
      this.isCountdownCancelled = true;
    }
  };

  // Template
  <template>
    <Metadata
      @title={{t "route.error.meta.title"}}
      @description={{t "route.error.meta.description"}}
    />

    {{onKey "Enter" this.terminate}}
    {{onKey this.restartCombo this.shutDown}}

    <div
      class={{bem (hash is-turning-off=this.powerOff.isRunning)}}
      {{windowOn "keydown" this.cancelCountdown}}
      {{windowOn "pointerdown" this.cancelCountdown}}
    >
      <div class={{wrapperBem (hash size="small" align="center")}}>
        <div class={{bem "screen"}}>
          <h1 class={{bem "title"}}>{{t "route.error.title"}}</h1>
          <p>{{t "route.error.exception" path=this.path}}</p>
          <p class={{bem "option"}}>
            <button
              class={{bem "action"}}
              type="button"
              data-test-error-terminate
              {{on "click" this.shutDown}}
            >{{t "route.error.terminate"}}</button>
          </p>
          <p class={{bem "option"}}>
            <button
              class={{bem "action"}}
              type="button"
              data-test-error-restart
              {{on "click" this.shutDown}}
            >{{t "route.error.restart" keys=(t this.restartKeys)}}</button>
          </p>
          <p data-test-error-countdown>
            {{#if this.isCountdownCancelled}}
              {{t "route.error.countdownCancelled"}}
            {{else}}
              {{t "route.error.countdown" seconds=this.seconds}}
            {{/if}}
          </p>
          <p>
            {{t "route.error.continue"}}<span
              class={{bem "cursor"}}
              aria-hidden="true"
            ></span>
          </p>
        </div>
      </div>
    </div>
  </template>
}
