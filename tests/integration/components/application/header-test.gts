import { type TestContext, click, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEn from 'virtual:ember-intl/translations/en';

import ApplicationHeader from 'portfolio/components/application/header';
import { setupRenderingTest } from 'portfolio/tests/helpers';

function noop() {}

class NavigationState {
  @tracked isOpen = false;

  setIsOpen = (isOpen: boolean) => {
    this.isOpen = isOpen;
  };
}

module('Integration | Component | application/header', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en', translationsForEn);

  hooks.beforeEach(function (this: TestContext) {
    // <LinkTo> needs a router to generate its hrefs from.
    (this.owner as unknown as { setupRouter: () => void }).setupRouter();
  });

  test('it renders the header with the logo linking home', async function (assert) {
    const state = new NavigationState();

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    assert.dom('[data-test-header]').exists();
    assert.dom('[data-test-logo]').exists('the animated logo is rendered');
    assert.dom('[data-test-logo-link]').hasAttribute('href', '/');
  });

  test('it renders the navigation links', async function (assert) {
    const state = new NavigationState();

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    assert.dom('[data-test-navigation-link]').exists({ count: 4 });

    assert
      .dom('[data-test-navigation-link="projects"]')
      .hasText('Projects')
      .hasAttribute('href', '/projects');

    assert
      .dom('[data-test-navigation-link="about"]')
      .hasText('About me')
      .hasAttribute('href', '/about');

    assert
      .dom('[data-test-navigation-link="imprint"]')
      .hasText('Imprint')
      .hasAttribute('href', '/imprint');

    assert
      .dom('[data-test-navigation-link="privacy"]')
      .hasText('Privacy')
      .hasAttribute('href', '/privacy');
  });

  test('the navigation overlay is hidden while the navigation is closed', async function (assert) {
    const state = new NavigationState();

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    assert.dom('[data-test-navigation-overlay]').hasStyle({
      visibility: 'hidden',
      opacity: '0',
    });
  });

  test('the navigation overlay is revealed while the navigation is open', async function (assert) {
    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{true}}
          @setIsNavigationOpen={{noop}}
        />
      </template>,
    );

    assert.dom('[data-test-navigation-overlay]').hasStyle({
      visibility: 'visible',
      opacity: '1',
    });
  });

  test('the toggle opens and closes the navigation', async function (assert) {
    const state = new NavigationState();

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    await click('[data-test-navigation-toggle]');
    assert.true(state.isOpen, 'the first click opens the navigation');

    await click('[data-test-navigation-toggle]');
    assert.false(state.isOpen, 'the second click closes it again');
  });

  test('the toggle label scrambles and settles on the current state', async function (assert) {
    const state = new NavigationState();

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    assert.dom('[data-test-navigation-toggle-label]').hasText('menu');

    await click('[data-test-navigation-toggle]');
    assert
      .dom('[data-test-navigation-toggle-label]')
      .hasText('back', 'an open navigation offers the way back');

    await click('[data-test-navigation-toggle]');
    assert
      .dom('[data-test-navigation-toggle-label]')
      .hasText('menu', 'a closed navigation offers the menu again');
  });

  test('following a navigation link closes an open navigation', async function (assert) {
    const state = new NavigationState();
    state.isOpen = true;

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    await click('[data-test-navigation-link="projects"]');

    assert.false(state.isOpen);
  });

  test('the back-to-overview link stays hidden outside a project detail', async function (assert) {
    const state = new NavigationState();

    await render(
      <template>
        <ApplicationHeader
          @isNavigationOpen={{state.isOpen}}
          @setIsNavigationOpen={{state.setIsOpen}}
        />
      </template>,
    );

    assert
      .dom('[data-test-back-to-overview-link]')
      .hasAttribute('href', '/projects');
    assert.dom('[data-test-back-to-overview]').hasStyle({
      visibility: 'hidden',
      opacity: '0',
    });
  });
});
