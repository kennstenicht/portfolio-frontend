import { on } from '@ember/modifier';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

// Where each fragment leads: the page or project that backs up its claim.
const LINKS = {
  'moin': ['page', 'about'],
  'i-am': ['page', 'about'],
  'lead-developer': ['projects.show', 'pagebuilder'],
  'ux-background': ['projects.show', 'mint-ec'],
  'products-that-last': ['projects.show', 'umg-cms'],
  'playful-ideas': ['projects.show', 'flimmerkasten'],
} satisfies Record<string, [route: string, model: string]>;

export type Fragment = keyof typeof LINKS;

export interface IntroFragmentLinkSignature {
  Element: HTMLAnchorElement;
  Args: {
    fragment: Fragment;
    isSelected: boolean;
    select: () => void;
    deselect: () => void;
  };
  Blocks: { default: [] };
}

export default class IntroFragmentLink extends Component<IntroFragmentLinkSignature> {
  // Services
  @service declare router: RouterService;

  // Navigation
  // A plain anchor rather than LinkTo, which navigates on every click: a tap
  // has to be held back while it only reveals the image. A tap selects the
  // fragment before its click arrives, through the emulated mouseenter and
  // focus, so whether it was selected already is read at pointerup, which
  // comes before both.
  #isFirstTap = false;

  get href() {
    return this.router.urlFor(...LINKS[this.args.fragment]);
  }

  notePointer = (event: PointerEvent) => {
    this.#isFirstTap = event.pointerType === 'touch' && !this.args.isSelected;
  };

  open = (event: MouseEvent) => {
    const isFirstTap = this.#isFirstTap;

    this.#isFirstTap = false;

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (!isFirstTap) {
      void this.router.transitionTo(...LINKS[this.args.fragment]);
    }
  };

  // Template
  <template>
    {{! The block's trailing whitespace stays inside the link, so the justified gap to the next fragment is still hoverable and does not fire mouseleave. }}
    <a
      ...attributes
      href={{this.href}}
      data-test-home-fragment={{@fragment}}
      {{on "pointerup" this.notePointer}}
      {{on "click" this.open}}
      {{on "mouseenter" @select}}
      {{on "mouseleave" @deselect}}
      {{on "focus" @select}}
      {{on "blur" @deselect}}
    >
      {{~yield~}}
    </a>
  </template>
}
