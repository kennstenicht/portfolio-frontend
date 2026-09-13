/**
 * Browser globals that some addons touch at module-evaluation time but that the
 * SSG renderer's HappyDOM environment does not expose on `globalThis`.
 *
 * ember-animated freezes a module-level `new DOMRect(0, 0, 0, 0)` in its bounds
 * helper, which throws `ReferenceError: DOMRect is not defined` during prerender.
 * This module must be imported *first* in `app-ssr.ts` so the global exists
 * before ember-animated's modules evaluate. It is SSR-only and never reaches the
 * browser bundle.
 */
if (
  import.meta.env.SSR &&
  typeof (globalThis as { DOMRect?: unknown }).DOMRect === 'undefined'
) {
  class DOMRectPolyfill {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    get left() {
      return this.width < 0 ? this.x + this.width : this.x;
    }
    get top() {
      return this.height < 0 ? this.y + this.height : this.y;
    }
    get right() {
      return this.width < 0 ? this.x : this.x + this.width;
    }
    get bottom() {
      return this.height < 0 ? this.y : this.y + this.height;
    }

    static fromRect(
      rect: { x?: number; y?: number; width?: number; height?: number } = {},
    ) {
      return new DOMRectPolyfill(rect.x, rect.y, rect.width, rect.height);
    }

    toJSON() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left,
      };
    }
  }

  (globalThis as { DOMRect?: unknown }).DOMRect = DOMRectPolyfill;
}
