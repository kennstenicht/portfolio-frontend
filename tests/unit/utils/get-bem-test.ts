import { module, test } from 'qunit';

import { getBem } from 'portfolio/utils/get-bem';

// CSS module fixtures — plain objects that mirror what Vite/CSS Modules produces.
// Keys match what getBem looks up; values are the scoped class strings it returns.
const styles = {
  'scope': 'c-block',
  'scope--active': 'c-block--active',
  'scope--size-large': 'c-block--size-large',
  'scope--size-small': 'c-block--size-small',
  'element': 'c-block__element',
  'element--active': 'c-block__element--active',
  'element--size-large': 'c-block__element--size-large',
  'other': 'c-block__other',
} as Record<string, string>;

const extraStyles = {
  'scope': 'c-extra',
  'scope--active': 'c-extra--active',
  'element': 'c-extra__element',
} as Record<string, string>;

module('Unit | Utility | get-bem', function () {
  module('scope', function () {
    test('bem() with no args returns the scope class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem(), 'c-block');
    });

    test('bem() with a boolean true modifier appends the modifier class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem({ active: true }), 'c-block c-block--active');
    });

    test('bem() with a boolean false modifier omits the modifier class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem({ active: false }), 'c-block');
    });

    test('bem() with a string modifier appends the key-value modifier class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem({ size: 'large' }), 'c-block c-block--size-large');
    });

    test('bem() with an array modifier appends one class per array entry', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(
        bem({ size: ['large', 'small'] }),
        'c-block c-block--size-large c-block--size-small',
      );
    });

    test('bem() with multiple modifiers combines all truthy modifier classes', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(
        bem({ active: true, size: 'large' }),
        'c-block c-block--active c-block--size-large',
      );
    });

    test('bem() omits falsy modifiers from the output', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(
        bem({ active: false, size: 'large' }),
        'c-block c-block--size-large',
      );
    });
  });

  module('element', function () {
    test('bem(element) returns the element class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem('element'), 'c-block__element');
    });

    test('bem(element, modifier) returns element + element modifier class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(
        bem('element', { active: true }),
        'c-block__element c-block__element--active',
      );
    });

    test('bem(element, modifier) with a string modifier returns key-value element modifier class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(
        bem('element', { size: 'large' }),
        'c-block__element c-block__element--size-large',
      );
    });

    test('bem(element, modifier) with false modifier omits the modifier class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem('element', { active: false }), 'c-block__element');
    });

    test('bem(other) returns a different element class from the same module', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem('other'), 'c-block__other');
    });
  });

  module('multiple blocks', function () {
    test('getBem([block1, block2]) merges scope classes from both modules', function (assert) {
      const bem = getBem([styles, extraStyles]);
      assert.strictEqual(bem(), 'c-block c-extra');
    });

    test('getBem([block1, block2]) merges modifier classes from both modules', function (assert) {
      const bem = getBem([styles, extraStyles]);
      assert.strictEqual(
        bem({ active: true }),
        'c-block c-block--active c-extra c-extra--active',
      );
    });

    test('getBem([block1, block2]) merges element classes from both modules', function (assert) {
      const bem = getBem([styles, extraStyles]);
      assert.strictEqual(bem('element'), 'c-block__element c-extra__element');
    });

    test('missing keys in a block are silently omitted from the result', function (assert) {
      const bem = getBem([styles, extraStyles]);
      // 'other' only exists in styles, not extraStyles — no crash, no gap
      assert.strictEqual(bem('other'), 'c-block__other');
    });
  });

  module('edge cases', function () {
    test('bem() with no modifier object returns only the scope class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem(), 'c-block');
    });

    test('bem() with an empty modifier object returns only the scope class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem({}), 'c-block');
    });

    test('bem(element, {}) returns only the element class', function (assert) {
      const bem = getBem(styles);
      assert.strictEqual(bem('element', {}), 'c-block__element');
    });

    test('getBem with an empty array of blocks returns an empty string', function (assert) {
      const bem = getBem([]);
      assert.strictEqual(bem(), '');
    });

    test('a missing CSS module key results in the class being omitted', function (assert) {
      const sparse = { scope: 'c-sparse' } as Record<string, string>;
      const bem = getBem(sparse);
      // 'element' is not in sparse — should not throw, just return empty for that key
      assert.strictEqual(bem('element'), '');
    });
  });
});
