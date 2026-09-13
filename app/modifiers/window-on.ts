import { modifier } from 'ember-modifier';

export interface WindowOnSignature {
  Element: HTMLDivElement;
  Args: {
    Positional: [string, () => void];
  };
}

export const windowOn = modifier<WindowOnSignature>(
  (_element, [eventName, callback]) => {
    window.addEventListener(eventName, callback);

    return () => {
      // The capture flag must match the one used to add the listener, or the
      // listener is never removed — a destroyed component would keep handling
      // window events (and looking up services on its dead owner).
      window.removeEventListener(eventName, callback);
    };
  },
);
