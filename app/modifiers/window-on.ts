import { modifier } from 'ember-modifier';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    Positional: [string, () => void];
  };
}

export const windowOn = modifier<Signature>(
  (_element, [eventName, callback]) => {
    window.addEventListener(eventName, callback, false);

    return () => {
      window.removeEventListener(eventName, callback, true);
    };
  },
);
