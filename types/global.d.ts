declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// The classic `ember-data/store` re-export ships no types; borrow @ember-data/store's.
declare module 'ember-data/store' {
  import Store from '@ember-data/store';
  export default Store;
}

// Untyped v1 addons used in templates — minimal glint shims.
declare module 'ember-keyboard/helpers/on-key' {
  import type { HelperLike } from '@glint/template';

  const onKey: HelperLike<{
    Args: {
      Positional: [keyCombo: string, callback: (event: KeyboardEvent) => void];
    };
    Return: void;
  }>;
  export default onKey;
}

declare module 'ember-animated-tools/components/animated-tools' {
  import type { ComponentLike } from '@glint/template';

  const AnimatedTools: ComponentLike<{
    Args: {
      Named: {
        hideUntilKeys?: string;
      };
    };
  }>;
  export default AnimatedTools;
}
