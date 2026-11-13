import { on } from '@ember/modifier';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

// Where each fragment leads: the page or project that backs up its claim.
export const LINKS = {
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
    select: () => void;
    deselect: (event: Event) => void;
  };
  Blocks: { default: [] };
}

export default class IntroFragmentLink extends Component<IntroFragmentLinkSignature> {
  // Services
  @service declare router: RouterService;

  // Navigation
  // A plain anchor rather than LinkTo, which navigates on every click: a tap
  // only reveals the image, and the proof link is the way on from there. The
  // click event does not tell a tap apart, so it is read at pointerup, which
  // comes first.
  #isTap = false;

  get href() {
    return this.router.urlFor(...LINKS[this.args.fragment]);
  }

  notePointer = (event: PointerEvent) => {
    this.#isTap = event.pointerType === 'touch';
  };

  open = (event: MouseEvent) => {
    const isTap = this.#isTap;

    this.#isTap = false;

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

    if (!isTap) {
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
