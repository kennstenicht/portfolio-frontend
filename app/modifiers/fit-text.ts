import { registerDestructor } from '@ember/destroyable';
import { type TaskInstance, task, timeout } from 'ember-concurrency';
import Modifier from 'ember-modifier';

function cleanup(instance: FitText) {
  const { handler, fitTextTask } = instance;

  if (handler) {
    window.removeEventListener('resize', handler);
  }

  if (fitTextTask) {
    fitTextTask.cancelAll();
  }
}

export default class FitText extends Modifier {
  element: HTMLElement | null = null;
  handler?: () => TaskInstance<void>;
  fontSize: number = 10;
  lineHeight: number = 1.15;

  constructor(owner: unknown, args: unknown) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element: HTMLElement) {
    this.element = element;

    if (!this.handler) {
      this.handler = () => this.fitTextTask.perform(element, true);
      window.addEventListener('resize', this.handler);
    }

    this.fitTextTask.perform(element);
  }

  fitTextTask = task(
    { restartable: true },
    async (element: HTMLElement, debounce = false) => {
      if (debounce) {
        await timeout(100);
      }

      // Reset line height to default
      this.lineHeight = 1.15;
      element.style.lineHeight = `${this.lineHeight}`;

      if (element.scrollHeight > element.clientHeight) {
        // Text overflows: shrink the font size until it fits
        while (
          element.scrollHeight > element.clientHeight &&
          this.fontSize > 1
        ) {
          this.fontSize--;
          element.style.fontSize = `${this.fontSize}px`;
        }
      } else {
        // Text fits: grow the font size until it just overflows, then back off
        while (
          element.scrollHeight <= element.clientHeight &&
          this.fontSize < 100
        ) {
          this.fontSize++;
          element.style.fontSize = `${this.fontSize}px`;

          // Overshoot fix
          if (element.scrollHeight > element.clientHeight) {
            this.fontSize--;
            element.style.fontSize = `${this.fontSize}px`;
            break;
          }
        }
      }

      // ... then increase the line height
      while (
        element.scrollHeight <= element.clientHeight &&
        this.lineHeight < 1.6
      ) {
        this.lineHeight += 0.01;
        element.style.lineHeight = `${this.lineHeight}`;

        // Overshoot fix
        if (element.scrollHeight > element.clientHeight) {
          this.lineHeight -= 0.01;
          element.style.lineHeight = `${this.lineHeight}`;
          break;
        }
      }
    },
  );
}
