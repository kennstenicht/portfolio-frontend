import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

import type PixelOverlayService from 'portfolio/services/pixel-overlay';
import { SWEEP_DURATION } from 'portfolio/services/pixel-overlay';

const LOGO = { x: 40, y: 40 };
const LINK = { x: 600, y: 400 };

module('Unit | Service | pixel-overlay', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.pixelOverlay = this.owner.lookup(
      'service:pixel-overlay',
    ) as PixelOverlayService;
  });

  test('a cover holds until its owner reveals it', async function (assert) {
    const { pixelOverlay } = this;

    pixelOverlay.clickOrigin = LOGO;
    await pixelOverlay.cover('route');
    assert.true(pixelOverlay.isCovered);
    assert.deepEqual(pixelOverlay.origin, LOGO);

    pixelOverlay.clickOrigin = undefined;
    await pixelOverlay.reveal('route');
    assert.false(pixelOverlay.isCovered);
    assert.deepEqual(
      pixelOverlay.origin,
      LOGO,
      'without a click, the page opens up from where the cover came from',
    );
  });

  test('a reveal by a click opens up from the clicked element', async function (assert) {
    const { pixelOverlay } = this;

    pixelOverlay.clickOrigin = LOGO;
    await pixelOverlay.cover('navigation');

    pixelOverlay.clickOrigin = LINK;
    await pixelOverlay.reveal('navigation');

    assert.deepEqual(pixelOverlay.origin, LINK);
  });

  test('a reveal by someone else leaves the cover in place', async function (assert) {
    const { pixelOverlay } = this;

    pixelOverlay.clickOrigin = LOGO;
    void pixelOverlay.cover('route');

    pixelOverlay.clickOrigin = LINK;
    await pixelOverlay.reveal('navigation');

    assert.true(pixelOverlay.isCovered);
    assert.deepEqual(pixelOverlay.origin, LOGO);
  });

  test('covering a covered page takes the cover over at once', async function (assert) {
    const { pixelOverlay } = this;

    await pixelOverlay.cover('navigation');

    const start = performance.now();
    await pixelOverlay.cover('route');

    assert.true(
      performance.now() - start < SWEEP_DURATION,
      'no sweep to wait for',
    );
    assert.strictEqual(pixelOverlay.coveredBy, 'route');
  });
});
