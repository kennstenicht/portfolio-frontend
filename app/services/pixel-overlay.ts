import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';

export const SWEEP_DURATION = 450;
export const JITTER = 150;

// A point in viewport coordinates.
export interface PixelOverlayOrigin {
  x: number;
  y: number;
}

// The element's centre rather than the pointer, so keyboard activation, which
// clicks at 0,0, sweeps from the same place.
function originOf(element: Element): PixelOverlayOrigin {
  const { left, top, width, height } = element.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
}

export default class PixelOverlayService extends Service {
  // The overlay component injects this at the first render, before anything
  // can be clicked.
  constructor(owner: Owner) {
    super(owner);

    if (import.meta.env.SSR) {
      return;
    }

    window.addEventListener('click', this.#recordClickOrigin, {
      capture: true,
    });
    window.addEventListener('click', this.#clearClickOrigin);

    registerDestructor(this, () => {
      window.removeEventListener('click', this.#recordClickOrigin, {
        capture: true,
      });
      window.removeEventListener('click', this.#clearClickOrigin);
    });
  }

  // Click origin
  // Recorded while capturing, before the clicked element's own handlers, and
  // cleared while bubbling, after all of them — so a route change without a
  // click (back and forward) finds none. A link that morphs through a view
  // transition opts out with `data-view-transition`.
  clickOrigin?: PixelOverlayOrigin;

  #recordClickOrigin = (event: MouseEvent) => {
    const element = (event.target as Element).closest('a, [role="button"]');

    this.clickOrigin =
      element && !element.hasAttribute('data-view-transition')
        ? originOf(element)
        : undefined;
  };

  #clearClickOrigin = () => {
    this.clickOrigin = undefined;
  };

  // Sweep
  @tracked isCovered = false;
  @tracked origin: PixelOverlayOrigin = { x: 0, y: 0 };
  coveredBy?: 'navigation' | 'route';

  // Covering a covered page only takes the cover over, so its reveal is the
  // new owner's — going to the front page from the open navigation opens up
  // from the logo without sweeping in first.
  cover = async (coveredBy: 'navigation' | 'route') => {
    const wasCovered = this.isCovered;

    this.coveredBy = coveredBy;
    this.origin = this.clickOrigin ?? this.origin;
    this.isCovered = true;

    if (!wasCovered) {
      await timeout(SWEEP_DURATION + JITTER);
    }
  };

  // Only lifts its own cover, so closing the navigation leaves a cover the
  // front page took over in place. Without a click, the page opens up from
  // where the cover came from.
  reveal = async (coveredBy: 'navigation' | 'route') => {
    if (this.coveredBy !== coveredBy) {
      return;
    }

    this.origin = this.clickOrigin ?? this.origin;
    this.isCovered = false;

    await timeout(SWEEP_DURATION + JITTER);
  };
}
