import { findAll, render, triggerEvent, waitUntil } from '@ember/test-helpers';
import { module, test } from 'qunit';

import Logo, { WORDS } from 'portfolio/components/application/header/logo';
import { setupRenderingTest } from 'portfolio/tests/helpers';

const DEFAULT_WORD = WORDS[0] as string;

// The letters are laid out one per grid cell, so the spaces that pad every word
// to the same length survive as empty cells. Comparing the visible characters
// only keeps the assertions independent of the template's whitespace.
function withoutSpaces(word: string) {
  return word.replace(/\s/g, '');
}

function renderedWord() {
  return findAll('[data-test-logo-letter]')
    .map((letter) => letter.textContent?.trim() ?? '')
    .join('');
}

function isBackInPlace(letter: Element) {
  const { left, top } = window.getComputedStyle(letter);

  return left === '0px' && top === '0px';
}

module('Integration | Component | application/header/logo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders one cell per letter of the default word', async function (assert) {
    await render(<template><Logo /></template>);

    assert
      .dom('[data-test-logo-letter]')
      .exists({ count: DEFAULT_WORD.length });
    assert.strictEqual(renderedWord(), withoutSpaces(DEFAULT_WORD));
  });

  test('it exposes the logo as a button and forwards attributes', async function (assert) {
    await render(<template><Logo data-test-custom="yes" /></template>);

    assert
      .dom('[data-test-logo]')
      .hasAttribute('role', 'button')
      .hasAttribute('data-test-custom', 'yes');
  });

  test('hovering swaps the letters for another word of the list', async function (assert) {
    await render(<template><Logo /></template>);

    await triggerEvent('[data-test-logo]', 'mouseenter');

    await waitUntil(() => renderedWord() !== withoutSpaces(DEFAULT_WORD), {
      timeout: 3000,
    });

    assert
      .dom('[data-test-logo-letter]')
      .exists(
        { count: DEFAULT_WORD.length },
        'the grid keeps its number of cells',
      );
    assert.true(
      WORDS.map(withoutSpaces).includes(renderedWord()),
      `expected one of the configured words, got "${renderedWord()}"`,
    );
  });

  test('the letters fly back into their cell after the swap', async function (assert) {
    await render(<template><Logo /></template>);

    await triggerEvent('[data-test-logo]', 'mouseenter');

    await waitUntil(
      () =>
        renderedWord() !== withoutSpaces(DEFAULT_WORD) &&
        findAll('[data-test-logo-letter]').every(isBackInPlace),
      { timeout: 3000 },
    );

    assert.ok(
      findAll('[data-test-logo-letter]').every(isBackInPlace),
      'every letter ends up at its original offset',
    );
  });
});
