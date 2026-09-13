import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEn from 'virtual:ember-intl/translations/en';

import ApplicationFooter from 'portfolio/components/application/footer';
import { setupRenderingTest } from 'portfolio/tests/helpers';

// `transform: translate(0, 0)` — the footer has slid into view.
const IN_VIEW = 'matrix(1, 0, 0, 1, 0, 0)';

module('Integration | Component | application/footer', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en', translationsForEn);

  test('it renders the footer element', async function (assert) {
    await render(<template><ApplicationFooter /></template>);

    assert.dom('[data-test-footer]').exists();
  });

  test('it renders the social links', async function (assert) {
    await render(<template><ApplicationFooter /></template>);

    assert.dom('[data-test-social-link]').exists({ count: 3 });

    assert
      .dom('[data-test-social-link="github"]')
      .hasText('GitHub')
      .hasAttribute('href', 'https://github.com/kennstenicht');

    assert
      .dom('[data-test-social-link="bluesky"]')
      .hasText('Bluesky')
      .hasAttribute(
        'href',
        'https://bsky.app/profile/kennstenicht.bsky.social',
      );

    assert
      .dom('[data-test-social-link="linkedin"]')
      .hasText('LinkedIn')
      .hasAttribute('href', 'https://www.linkedin.com/in/christoph-wiedenmann');
  });

  test('every social link opens safely in a new tab', async function (assert) {
    await render(<template><ApplicationFooter /></template>);

    assert
      .dom('[data-test-social-link]')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'noopener noreferrer');
  });

  test('it renders the copyright for the current year', async function (assert) {
    await render(<template><ApplicationFooter /></template>);

    assert
      .dom('[data-test-copyright]')
      .hasText(`© ${new Date().getFullYear()} by Christoph Wiedenmann`);
  });

  test('it stays out of view while the navigation is closed', async function (assert) {
    await render(<template><ApplicationFooter /></template>);

    assert.dom('[data-test-footer-wrapper]').doesNotHaveStyle({
      transform: IN_VIEW,
    });
  });

  test('it slides into view while the navigation is open', async function (assert) {
    await render(
      <template><ApplicationFooter @isNavigationOpen={{true}} /></template>,
    );

    assert.dom('[data-test-footer-wrapper]').hasStyle({ transform: IN_VIEW });
  });
});
