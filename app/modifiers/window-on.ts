import { modifier } from 'ember-modifier';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    Positional: [string, () => void];
    Named: {};
  };
}

export default modifier<Signature>((_element, [eventName, callback]) => {
  window.addEventListener(eventName, callback, false);

  return () => {
    window.removeEventListener(eventName, callback, true);
  };
});
