import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import { task, timeout } from 'ember-concurrency';
import Modifier, { type ArgsFor } from 'ember-modifier';

export interface FitTextSignature {
  Element: HTMLElement;
}

function cleanup(instance: FitText) {
  const { handler, fitTextTask } = instance;

  if (handler) {
    window.removeEventListener('resize', handler);
  }

  if (fitTextTask) {
    void fitTextTask.cancelAll();
  }
}

export default class FitText extends Modifier<FitTextSignature> {
  element: HTMLElement | null = null;
  handler?: () => void;
  fontSize: number = 10;
  lineHeight: number = 1.15;

  constructor(owner: Owner, args: ArgsFor<FitTextSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element: HTMLElement) {
    if (import.meta.env.SSR) {
      return;
    }

    this.element = element;

    if (!this.handler) {
      this.handler = () => {
        void this.fitTextTask.perform(element, true);
      };
      window.addEventListener('resize', this.handler);
    }

    void this.fitTextTask.perform(element);
  }

  fitTextTask = task(
    { restartable: true },
    async (element: HTMLElement, debounce = false) => {
      if (debounce) {
        await timeout(100);
      }

      // Measuring with the fallback font fits the text to the wrong metrics,
      // which leaves a gap once the web font swaps in.
      await document.fonts.ready;

      // Fit to the last baseline rather than scrollHeight: the text is
      // uppercase, so below it is only empty half-leading, which may overflow.
      // A zero-height inline-block sits with its bottom edge on the baseline.
      const probe = document.createElement('span');
      probe.style.display = 'inline-block';
      probe.setAttribute('aria-hidden', 'true');
      element.append(probe);

      const overflows = () =>
        probe.getBoundingClientRect().bottom -
          element.getBoundingClientRect().top >
        element.clientHeight;

      // Reset line height to default
      this.lineHeight = 1.15;
      element.style.lineHeight = `${this.lineHeight}`;

      if (overflows()) {
        // Text overflows: shrink the font size until it fits
        while (overflows() && this.fontSize > 1) {
          this.fontSize--;
          element.style.fontSize = `${this.fontSize}px`;
        }
      } else {
        // Text fits: grow the font size until it just overflows, then back off
        while (!overflows() && this.fontSize < 100) {
          this.fontSize++;
          element.style.fontSize = `${this.fontSize}px`;

          // Overshoot fix
          if (overflows()) {
            this.fontSize--;
            element.style.fontSize = `${this.fontSize}px`;
            break;
          }
        }
      }

      // ... then increase the line height
      while (!overflows() && this.lineHeight < 1.6) {
        this.lineHeight += 0.01;
        element.style.lineHeight = `${this.lineHeight}`;

        // Overshoot fix
        if (overflows()) {
          this.lineHeight -= 0.01;
          element.style.lineHeight = `${this.lineHeight}`;
          break;
        }
      }

      probe.remove();
    },
  );
}
