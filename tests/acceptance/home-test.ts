import {
  click,
  currentURL,
  focus,
  triggerEvent,
  visit,
  waitUntil,
} from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'portfolio/tests/helpers';

// `click` fires no pointer events, so a tap is the touch pointerup it starts with.
async function touchTap(selector: string) {
  await triggerEvent(selector, 'pointerup', { pointerType: 'touch' });
  await click(selector);
}

// The route change finishes after the pixel overlay's sweep, which `settled`
// does not wait for, so the link tests wait for the URL.
module('Acceptance | home', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting / renders the home page with translations', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/', 'we are on the home route');
    assert
      .dom(document.body)
      .doesNotIncludeText(
        'Missing translation',
        'ember-intl translations are loaded',
      );
  });

  test('a message fragment reveals its image on focus and on the first tap', async function (assert) {
    assert.expect(5);

    await visit('/');

    await focus('[data-test-home-fragment="i-am"]');
    assert
      .dom('[data-test-home-image="i-am"]')
      .exists('focus shows the image of the fragment');

    await touchTap('[data-test-home-fragment="playful-ideas"]');
    assert
      .dom('[data-test-home-image="playful-ideas"]')
      .exists('a tap shows the image of the tapped fragment');
    assert
      .dom('[data-test-home-image="i-am"]')
      .doesNotExist('only one image is shown');
    assert.strictEqual(currentURL(), '/', 'the first tap does not navigate');

    assert
      .dom('[data-test-home-fragment="i-am"]')
      .hasStyle(
        { display: 'inline' },
        'fragments stay inline so the sentence wraps as one text block',
      );
  });

  test('a second tap on the same fragment opens its link', async function (assert) {
    await visit('/');

    await touchTap('[data-test-home-fragment="playful-ideas"]');
    await touchTap('[data-test-home-fragment="playful-ideas"]');

    await waitUntil(() => currentURL() === '/projects/flimmerkasten');
    assert.strictEqual(currentURL(), '/projects/flimmerkasten');
  });

  test('a click on a fragment opens its project', async function (assert) {
    await visit('/');
    await click('[data-test-home-fragment="products-that-last"]');

    await waitUntil(() => currentURL() === '/projects/umg-cms');
    assert.strictEqual(currentURL(), '/projects/umg-cms');
  });

  test('a click on the greeting opens the about page', async function (assert) {
    await visit('/');
    await click('[data-test-home-fragment="moin"]');

    await waitUntil(() => currentURL() === '/about');
    assert.strictEqual(currentURL(), '/about');
  });

  test('the image covers the whole page', async function (assert) {
    await visit('/');
    await focus('[data-test-home-fragment="i-am"]');

    const image = document.querySelector<HTMLImageElement>(
      '[data-test-home-image="i-am"]',
    )!;

    assert.strictEqual(
      image.getBoundingClientRect().height,
      image.offsetParent!.getBoundingClientRect().height,
    );
  });
});
