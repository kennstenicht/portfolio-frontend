import { currentURL, visit } from '@ember/test-helpers';
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
});
