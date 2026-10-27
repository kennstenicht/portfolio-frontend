import {
  click,
  currentURL,
  triggerKeyEvent,
  visit,
  waitUntil,
} from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'portfolio/tests/helpers';

// The route change after the power-off runs inside a view transition, which
// `settled` does not wait for, so the tests wait for the URL.
module('Acceptance | error', function (hooks) {
  setupApplicationTest(hooks);

  test('names the requested path', async function (assert) {
    await visit('/does-not-exist');

    assert.dom(document.body).includesText('in /does-not-exist.');
  });

  test('Enter powers off to the home page', async function (assert) {
    await visit('/does-not-exist');
    await triggerKeyEvent(document.body, 'keydown', 'Enter');
    await waitUntil(() => currentURL() === '/', { timeout: 5000 });

    assert.strictEqual(currentURL(), '/');
  });

  test('restarting powers off to the home page', async function (assert) {
    await visit('/does-not-exist');
    await click('[data-test-error-restart]');
    await waitUntil(() => currentURL() === '/', { timeout: 5000 });

    assert.strictEqual(currentURL(), '/');
  });

  test('any key cancels the automatic restart', async function (assert) {
    await visit('/does-not-exist');

    assert.dom('[data-test-error-countdown]').includesText('will restart in');

    await triggerKeyEvent(document.body, 'keydown', 'Space');

    assert.dom('[data-test-error-countdown]').includesText('cancelled');
  });

  test('the restart combo does not cancel the automatic restart', async function (assert) {
    await visit('/does-not-exist');
    await triggerKeyEvent(document.body, 'keydown', 'ControlLeft', {
      ctrlKey: true,
    });
    await triggerKeyEvent(document.body, 'keydown', 'AltLeft', {
      ctrlKey: true,
      altKey: true,
    });

    assert.dom('[data-test-error-countdown]').doesNotIncludeText('cancelled');
  });
});
