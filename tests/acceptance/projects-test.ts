import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from 'portfolio/tests/helpers';

module('Acceptance | projects', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /projects renders the project list', async function (assert) {
    await visit('/projects');

    assert.strictEqual(
      currentURL(),
      '/projects',
      'we are on the projects route',
    );
    assert
      .dom(document.body)
      .includesText('MINT EC', 'a known project title is rendered');
  });

  test('visiting /projects/:id renders the project detail', async function (assert) {
    await visit('/projects/mint-ec');

    assert.strictEqual(
      currentURL(),
      '/projects/mint-ec',
      'we are on the project detail route',
    );
    assert
      .dom(document.body)
      .includesText('MINT EC', "the requested project's title is rendered");
  });

  test('visiting an unknown project id does not crash the app', async function (assert) {
    await visit('/projects/does-not-exist');

    assert
      .dom(document.body)
      .doesNotIncludeText(
        'Missing translation',
        'ember-intl translations are loaded',
      );
  });
});
