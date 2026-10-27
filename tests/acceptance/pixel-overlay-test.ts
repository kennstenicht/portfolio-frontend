import {
  click,
  currentURL,
  find,
  settled,
  visit,
  waitUntil,
} from '@ember/test-helpers';
import { module, test } from 'qunit';

import type PixelOverlayService from 'portfolio/services/pixel-overlay';
import { SWEEP_DURATION } from 'portfolio/services/pixel-overlay';
import { setupApplicationTest } from 'portfolio/tests/helpers';

function centreOf(selector: string) {
  const { left, top, width, height } = find(selector)!.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
}

// The view transition retries a route change after the next frame, which
// `settled` does not wait for, so those tests wait for the URL first.
module('Acceptance | pixel overlay', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.pixelOverlay = this.owner.lookup(
      'service:pixel-overlay',
    ) as PixelOverlayService;
  });

  test('a link click covers the page from the link and opens it up from there', async function (assert) {
    const { pixelOverlay } = this;

    await visit('/projects');
    const navigation = click('[data-test-logo-link]');

    await waitUntil(() => pixelOverlay.isCovered);
    assert.strictEqual(
      currentURL(),
      '/projects',
      'the route changes behind the cells',
    );
    assert.deepEqual(pixelOverlay.origin, centreOf('[data-test-logo-link]'));

    await navigation;
    assert.strictEqual(currentURL(), '/');
    assert.deepEqual(pixelOverlay.origin, centreOf('[data-test-logo-link]'));
    assert.false(pixelOverlay.isCovered, 'the page is revealed');
  });

  test('a route change without a click does not cover the page', async function (assert) {
    const { pixelOverlay } = this;

    await visit('/projects');
    void visit('/').catch(() => {});
    await waitUntil(() => currentURL() === '/');
    await settled();

    assert.strictEqual(pixelOverlay.coveredBy, undefined, 'it never covered');
  });

  test('a project keeps its morph back to the overview', async function (assert) {
    const { pixelOverlay } = this;

    await visit('/projects/mint-ec');
    await click('[data-test-back-to-overview-link]');
    await waitUntil(() => currentURL() === '/projects');
    await settled();

    assert.strictEqual(pixelOverlay.coveredBy, undefined, 'it never covered');
  });

  test('a click during a cover takes it over for the new route', async function (assert) {
    const { pixelOverlay } = this;

    await visit('/projects');
    void click('[data-test-logo-link]');
    await waitUntil(() => pixelOverlay.isCovered);

    await click('[data-test-navigation-link="about"]');

    assert.strictEqual(currentURL(), '/about');
    assert.deepEqual(
      pixelOverlay.origin,
      centreOf('[data-test-navigation-link="about"]'),
    );
    assert.false(pixelOverlay.isCovered, 'the page is revealed');
  });

  test('a route change without a click during a cover reveals the page', async function (assert) {
    const { pixelOverlay } = this;

    await visit('/projects');
    void click('[data-test-logo-link]');
    await waitUntil(() => pixelOverlay.isCovered);

    void visit('/about').catch(() => {});
    await waitUntil(() => currentURL() === '/about');
    await settled();

    assert.false(pixelOverlay.isCovered, 'the page is revealed');
  });

  test('with the navigation open, a link takes its cover over', async function (assert) {
    const { pixelOverlay } = this;

    await visit('/projects');
    await click('[data-test-navigation-toggle]');
    assert.deepEqual(
      pixelOverlay.origin,
      centreOf('[data-test-navigation-toggle]'),
      'the navigation sweeps out of the toggle',
    );

    const navigation = click('[data-test-navigation-link="about"]');

    await waitUntil(() => currentURL() === '/about', {
      timeout: SWEEP_DURATION,
      timeoutMessage: 'the route changes without a sweep to wait for',
    });

    await navigation;
    assert.deepEqual(
      pixelOverlay.origin,
      centreOf('[data-test-navigation-link="about"]'),
      'the page opens up from the link',
    );
    assert.false(pixelOverlay.isCovered, 'the page is revealed');
  });
});

declare module '@ember/test-helpers' {
  interface TestContext {
    pixelOverlay: PixelOverlayService;
  }
}
