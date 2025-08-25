import { registerDestructor } from '@ember/destroyable';

import { task, timeout, type TaskInstance } from 'ember-concurrency';
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
  lastElementSize: number = 1;

  constructor(owner: unknown, args: unknown) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element: HTMLElement) {
    this.fitTextTask.perform(element);

    this.handler = () => this.fitTextTask.perform(element);
    this.element = element;

    window.addEventListener('resize', this.handler);
  }

  fitTextTask = task({ restartable: true }, async (element: HTMLElement) => {
    // Reset line height to default
    this.lineHeight = 1.15;
    element.style.lineHeight = this.lineHeight;

    // Get allement size
    const elementSize = element.clientWidth * element.clientHeight;

    // Check if the element size increased or decreased
    if (elementSize > this.lastElementSize) {
      // If element increase first increase the font size...
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
    } else {
      // If element decrease first decrease font size...
      while (element.scrollHeight > element.clientHeight && this.fontSize > 1) {
        this.fontSize--;
        element.style.fontSize = `${this.fontSize}px`;
      }
    }

    // ... then increase the line height
    while (
      element.scrollHeight <= element.clientHeight &&
      this.lineHeight < 1.6
    ) {
      this.lineHeight += 0.01;
      element.style.lineHeight = this.lineHeight;

      // Overshoot fix
      if (element.scrollHeight > element.clientHeight) {
        this.lineHeight -= 0.01;
        element.style.lineHeight = this.lineHeight;
        break;
      }
    }

    this.lastElementSize = elementSize;
  });
}
