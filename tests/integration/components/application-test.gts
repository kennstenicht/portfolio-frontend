import { type TestContext, click, render, settled } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEn from 'virtual:ember-intl/translations/en';

import Application from 'portfolio/components/application';
import { setupRenderingTest } from 'portfolio/tests/helpers';

const BLUR_TITLE = '>>>> Click here now <<<<';
const PAGE_CONTENT = 'Page content';

module('Integration | Component | application', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en', translationsForEn);

  hooks.beforeEach(function (this: TestContext) {
    // <LinkTo> in the header needs a router to generate its hrefs from.
    (this.owner as unknown as { setupRouter: () => void }).setupRouter();
  });

  test('it renders the frame around header, content and footer', async function (assert) {
    await render(
      <template>
        <Application>
          <p data-test-page>{{PAGE_CONTENT}}</p>
        </Application>
      </template>,
    );

    assert.dom('[data-test-application]').exists();
    assert.dom('[data-test-header]').exists();
    assert.dom('[data-test-footer]').exists();
    assert.dom('[data-test-cookie-notice]').exists();
    assert.dom('[data-test-frame]').exists();
    assert.dom('[data-test-main] [data-test-page]').hasText(PAGE_CONTENT);
  });

  test('opening the navigation from the header reveals the overlay', async function (assert) {
    await render(
      <template>
        <Application>
          <p>{{PAGE_CONTENT}}</p>
        </Application>
      </template>,
    );

    assert.dom('[data-test-navigation-overlay]').hasStyle({
      visibility: 'hidden',
    });

    await click('[data-test-navigation-toggle]');

    assert.dom('[data-test-navigation-overlay]').hasStyle({
      visibility: 'visible',
    });
  });

  test('leaving the window swaps the document title and coming back restores it', async function (assert) {
    const originalTitle = document.title;

    await render(
      <template>
        <Application>
          <p>{{PAGE_CONTENT}}</p>
        </Application>
      </template>,
    );

    try {
      window.dispatchEvent(new Event('blur'));
      await settled();

      assert.strictEqual(document.title, BLUR_TITLE, 'the teaser takes over');

      window.dispatchEvent(new Event('focus'));
      await settled();

      assert.strictEqual(
        document.title,
        originalTitle,
        'the real title comes back',
      );
    } finally {
      document.title = originalTitle;
    }
  });

  test('it stops listening for window events once torn down', async function (assert) {
    const originalTitle = document.title;

    await render(
      <template>
        <Application>
          <p>{{PAGE_CONTENT}}</p>
        </Application>
      </template>,
    );

    await render(<template>{{PAGE_CONTENT}}</template>);

    try {
      window.dispatchEvent(new Event('blur'));
      await settled();

      assert.strictEqual(document.title, originalTitle);
    } finally {
      document.title = originalTitle;
    }
  });
});
