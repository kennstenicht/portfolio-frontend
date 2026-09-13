import {
  type TestContext,
  click,
  find,
  render,
  settled,
  waitUntil,
} from '@ember/test-helpers';
import type CookiesService from 'ember-cookies/services/cookies';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEn from 'virtual:ember-intl/translations/en';

import CookieNotice from 'portfolio/components/application/cookie-notice';
import { setupRenderingTest } from 'portfolio/tests/helpers';

// `transform: translate(0, 0)` — the notice has slid up from below the fold.
const IN_VIEW = 'matrix(1, 0, 0, 1, 0, 0)';

function isInView() {
  const notice = find('[data-test-cookie-notice]') as HTMLElement;

  return window.getComputedStyle(notice).transform === IN_VIEW;
}

const COOKIE_NAMES = ['allow_analyse_cookies', 'hide_cookie_notice'];

function cookiesFor(context: TestContext) {
  return context.owner.lookup('service:cookies') as CookiesService;
}

module('Integration | Component | application/cookie-notice', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en', translationsForEn);

  // The cookies service writes real document cookies, so every test has to
  // start from — and leave behind — a browser without a stored choice.
  hooks.beforeEach(function (this: TestContext) {
    COOKIE_NAMES.forEach((name) => cookiesFor(this).clear(name));
  });

  hooks.afterEach(function (this: TestContext) {
    COOKIE_NAMES.forEach((name) => cookiesFor(this).clear(name));
    window.location.hash = '';
  });

  test('it asks for consent when no choice has been stored', async function (assert) {
    await render(<template><CookieNotice /></template>);

    assert.dom('[data-test-cookie-notice]').hasStyle({ transform: IN_VIEW });
    assert
      .dom('[data-test-cookie-notice]')
      .includesText('This website uses cookies');
  });

  test('it stays out of sight once a choice has been stored', async function (this: TestContext, assert) {
    cookiesFor(this).write('hide_cookie_notice', true);

    await render(<template><CookieNotice /></template>);

    assert
      .dom('[data-test-cookie-notice]')
      .doesNotHaveStyle({ transform: IN_VIEW });
  });

  test('the required cookies cannot be opted out of', async function (assert) {
    await render(<template><CookieNotice /></template>);

    assert.dom('#allow-required-cookies').isChecked().isDisabled();
    assert.dom('#allow-analyse-cookies').isNotChecked().isNotDisabled();
  });

  test('it restores a stored analytics consent', async function (this: TestContext, assert) {
    cookiesFor(this).write('allow_analyse_cookies', true);

    await render(<template><CookieNotice /></template>);

    assert.dom('#allow-analyse-cookies').isChecked();
  });

  test('allowing all cookies stores the analytics consent', async function (this: TestContext, assert) {
    await render(<template><CookieNotice /></template>);

    await click('[data-test-allow-all-cookies]');

    assert.strictEqual(cookiesFor(this).read('allow_analyse_cookies'), 'true');
    assert.strictEqual(cookiesFor(this).read('hide_cookie_notice'), 'true');
  });

  test('allowing the selection stores the untouched checkboxes as a refusal', async function (this: TestContext, assert) {
    await render(<template><CookieNotice /></template>);

    await click('[data-test-allow-selected-cookies]');

    assert.strictEqual(cookiesFor(this).read('allow_analyse_cookies'), 'false');
    assert.strictEqual(cookiesFor(this).read('hide_cookie_notice'), 'true');
  });

  test('allowing the selection stores a ticked analytics checkbox', async function (this: TestContext, assert) {
    await render(<template><CookieNotice /></template>);

    await click('#allow-analyse-cookies');
    await click('[data-test-allow-selected-cookies]');

    assert.strictEqual(cookiesFor(this).read('allow_analyse_cookies'), 'true');
  });

  test('the settings hash brings the notice back', async function (this: TestContext, assert) {
    cookiesFor(this).write('hide_cookie_notice', true);

    await render(<template><CookieNotice /></template>);

    assert
      .dom('[data-test-cookie-notice]')
      .doesNotHaveStyle({ transform: IN_VIEW });

    window.location.hash = '#change-cookie-settings';
    window.dispatchEvent(new Event('hashchange'));
    await settled();

    // The notice slides in, so wait out the transition rather than the runloop.
    await waitUntil(isInView, { timeout: 2000 });

    assert.ok(isInView(), 'the notice is back in view');
    assert.strictEqual(
      window.location.hash,
      '',
      'the hash is consumed so a reload does not reopen the notice',
    );
  });
});
