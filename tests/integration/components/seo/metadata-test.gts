import { clearRender, render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import Metadata from 'portfolio/components/seo/metadata';
import { setupRenderingTest } from 'portfolio/tests/helpers';

function headTitles(): Array<string | null> {
  return [...document.head.querySelectorAll('title')].map((t) => t.textContent);
}

module('Integration | Component | seo/metadata', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en');

  test('it renders the full description / Open Graph / Twitter set', async function (assert) {
    await render(
      <template>
        <Metadata @title="My Title" @description="My description" />
      </template>,
    );

    const head = document.head;

    assert
      .dom('meta[name="description"]', head)
      .hasAttribute('content', 'my description');
    assert
      .dom('meta[property="og:site_name"]', head)
      .hasAttribute('content', 'wiedenmann.cc');
    assert
      .dom('meta[property="og:url"]', head)
      .hasAttribute('content', /^https:\/\/wiedenmann\.cc\//);
    assert
      .dom('meta[property="og:locale"]', head)
      .hasAttribute('content', 'en');
    assert
      .dom('meta[property="og:title"]', head)
      .hasAttribute('content', 'my title');
    assert
      .dom('meta[property="og:description"]', head)
      .hasAttribute('content', 'my description');
    assert
      .dom('meta[name="twitter:card"]', head)
      .hasAttribute('content', 'summary_large_image');
    assert
      .dom('meta[name="twitter:title"]', head)
      .hasAttribute('content', 'my title');
    assert
      .dom('meta[name="twitter:description"]', head)
      .hasAttribute('content', 'my description');
  });

  test('it renders the default share image', async function (assert) {
    await render(<template><Metadata @title="T" @description="D" /></template>);

    assert
      .dom('meta[property="og:image"]', document.head)
      .hasAttribute(
        'content',
        'https://wiedenmann.cc/assets/meta/sharing-image--default.jpg',
      );
    assert
      .dom('meta[name="twitter:image"]', document.head)
      .hasAttribute(
        'content',
        'https://wiedenmann.cc/assets/meta/sharing-image--default.jpg',
      );
  });

  test('a per-page image overrides the default and is made absolute', async function (assert) {
    await render(
      <template>
        <Metadata @title="T" @description="D" @image="/custom.png" />
      </template>,
    );

    assert
      .dom('meta[property="og:image"]', document.head)
      .hasAttribute('content', 'https://wiedenmann.cc/custom.png');
  });

  test('it renders the document <title> suffixed with the site name', async function (assert) {
    await render(
      <template><Metadata @title="Project 1" @description="d" /></template>,
    );

    assert.true(
      headTitles().includes('project 1 | wiedenmann.cc'),
      `expected a <title> "project 1 | wiedenmann.cc", got ${JSON.stringify(headTitles())}`,
    );
  });

  test('it uses just the site name as the landing-page title', async function (assert) {
    await render(
      <template><Metadata @title="wiedenmann.cc" @description="d" /></template>,
    );

    assert.true(headTitles().includes('wiedenmann.cc'));
  });

  test('og:type defaults to "website"', async function (assert) {
    await render(<template><Metadata @title="T" @description="D" /></template>);

    assert
      .dom('meta[property="og:type"]', document.head)
      .hasAttribute('content', 'website');
  });

  test('og:type can be overridden', async function (assert) {
    await render(
      <template>
        <Metadata @title="T" @description="D" @type="article" />
      </template>,
    );

    assert
      .dom('meta[property="og:type"]', document.head)
      .hasAttribute('content', 'article');
  });

  test('it omits tags whose content is missing', async function (assert) {
    await render(<template><Metadata @title="Only Title" /></template>);

    // description-derived tags are skipped entirely (no empty content="")
    assert.dom('meta[name="description"]', document.head).doesNotExist();
    assert.dom('meta[property="og:description"]', document.head).doesNotExist();
    assert
      .dom('meta[name="twitter:description"]', document.head)
      .doesNotExist();

    // tags that always have content are still present
    assert
      .dom('meta[property="og:title"]', document.head)
      .hasAttribute('content', 'only title');
    assert.dom('meta[property="og:site_name"]', document.head).exists();
  });

  test('it removes its tags from <head> when torn down', async function (assert) {
    await render(<template><Metadata @title="T" @description="D" /></template>);
    assert.dom('meta[property="og:title"]', document.head).exists();

    await clearRender();
    assert.dom('meta[property="og:title"]', document.head).doesNotExist();
  });
});
