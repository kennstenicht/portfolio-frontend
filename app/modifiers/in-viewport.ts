import { modifier } from 'ember-modifier';

interface InViewportSignature {
  Element: HTMLMediaElement;
  Args: {
    Named: {
      onEnter: (entry: IntersectionObserverEntry) => void;
      onExit: (entry: IntersectionObserverEntry) => void;
    };
    Positional: [];
  };
}

export const inViewport = modifier<InViewportSignature>((element, _, named) => {
  const { onEnter, onExit } = named;

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry) {
      return;
    }

    if (entry.isIntersecting) {
      onEnter(entry);
    } else {
      onExit(entry);
    }
  });
  observer.observe(element);

  return () => observer.disconnect();
});
