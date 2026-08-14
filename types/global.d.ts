declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// Untyped addon modules — minimal shims.
declare module 'ember-keyboard/services/keyboard' {
  import type Service from '@ember/service';

  export default class KeyboardService extends Service {}
}

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
