import { click, currentURL, focus, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'portfolio/tests/helpers';

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

  test('a message fragment reveals its image on focus and on tap', async function (assert) {
    assert.expect(4);

    await visit('/');

    await focus('[data-test-home-fragment="i-am"]');
    assert
      .dom('[data-test-home-image="i-am"]')
      .exists('focus shows the image of the fragment');

    await click('[data-test-home-fragment="playful-ideas"]');
    assert
      .dom('[data-test-home-image="playful-ideas"]')
      .exists('a tap shows the image of the tapped fragment');
    assert
      .dom('[data-test-home-image="i-am"]')
      .doesNotExist('only one image is shown');

    assert
      .dom('[data-test-home-fragment="i-am"]')
      .hasStyle(
        { display: 'inline' },
        'fragments stay inline so the sentence wraps as one text block',
      );
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
