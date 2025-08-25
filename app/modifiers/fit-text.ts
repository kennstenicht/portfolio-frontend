import { registerDestructor } from '@ember/destroyable';

import { task, timeout, type TaskInstance } from 'ember-concurrency';
import Modifier from 'ember-modifier';

function cleanup(instance: FitText) {
  const { element, handler, fitTextTask } = instance;

  if (element && handler) {
    element.removeEventListener('resize', handler);
    fitTextTask.cancelAll();
  }
}

export default class FitText extends Modifier {
  element: HTMLElement | null = null;
  handler?: () => TaskInstance<void>;
  fontSize: number = 10;
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
    await timeout(50);

    const elementSize = element.clientWidth * element.clientHeight;

    if (elementSize > this.lastElementSize) {
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
      while (element.scrollHeight > element.clientHeight && this.fontSize > 1) {
        this.fontSize--;
        element.style.fontSize = `${this.fontSize}px`;
      }
    }

    this.lastElementSize = elementSize;
  });
}
