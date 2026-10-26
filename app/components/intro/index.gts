import { concat, fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import fitText from 'portfolio/modifiers/fit-text';
import { getBem } from 'portfolio/utils/get-bem';

import iAm from './images/i-am.png';
import leadDeveloper from './images/lead-developer.png';
import moin from './images/moin.png';
import playfulIdeas from './images/playful-ideas.png';
import productsThatLast from './images/products-that-last.png';
import uxBackground from './images/ux-background.png';
import styles from './styles.module.css';

const bem = getBem(styles);

const IMAGES = {
  moin,
  'i-am': iAm,
  'lead-developer': leadDeveloper,
  'ux-background': uxBackground,
  'products-that-last': productsThatLast,
  'playful-ideas': playfulIdeas,
};

type Fragment = keyof typeof IMAGES;

const FRAGMENTS: Fragment[] = [
  'i-am',
  'lead-developer',
  'ux-background',
  'products-that-last',
  'playful-ideas',
];

// Where each fragment leads: the page or project that backs up its claim.
const LINKS: Record<Fragment, [route: string, model: string]> = {
  'moin': ['page', 'about'],
  'i-am': ['page', 'about'],
  'lead-developer': ['projects.show', 'pagebuilder'],
  'ux-background': ['projects.show', 'mint-ec'],
  'products-that-last': ['projects.show', 'umg-cms'],
  'playful-ideas': ['projects.show', 'flimmerkasten'],
};

export interface IntroSignature {
  Element: HTMLDivElement;
}

export default class Intro extends Component<IntroSignature> {
  // Services
  @service declare router: RouterService;

  // Fragments
  @tracked selectedFragment?: Fragment;

  get selectedImage() {
    return this.selectedFragment && IMAGES[this.selectedFragment];
  }

  select = (fragment: Fragment) => {
    this.selectedFragment = fragment;
  };

  deselect = () => {
    this.selectedFragment = undefined;
  };

  isSelected = (fragment: Fragment) => this.selectedFragment === fragment;

  // Links
  // Plain anchors rather than LinkTo, which navigates on every click: a tap
  // has to be held back while it only reveals the image. A tap selects the
  // fragment before its click arrives, through the emulated mouseenter and
  // focus, so whether it was selected already is read at pointerup, which
  // comes before both.
  #isFirstTap = false;

  href = (fragment: Fragment) => this.router.urlFor(...LINKS[fragment]);

  notePointer = (fragment: Fragment, event: PointerEvent) => {
    this.#isFirstTap =
      event.pointerType === 'touch' && !this.isSelected(fragment);
  };

  open = (fragment: Fragment, event: MouseEvent) => {
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
      void this.router.transitionTo(...LINKS[fragment]);
    }
  };

  // Template
  <template>
    <div class={{(bem)}} ...attributes>
      {{#if this.selectedImage}}
        <img
          class={{bem "huge-image"}}
          src={{this.selectedImage}}
          width="350"
          height="350"
          alt={{t (concat "intro.altText." this.selectedFragment)}}
          data-test-home-image={{this.selectedFragment}}
        />
      {{/if}}
      <div class={{bem "message"}} {{fitText}}>
        <h1 class={{bem "title"}}>
          <a
            class={{bem
              "fragment"
              (hash style="moin" is-selected=(this.isSelected "moin"))
            }}
            href={{this.href "moin"}}
            data-test-home-fragment="moin"
            {{on "pointerup" (fn this.notePointer "moin")}}
            {{on "click" (fn this.open "moin")}}
            {{on "mouseenter" (fn this.select "moin")}}
            {{on "mouseleave" this.deselect}}
            {{on "focus" (fn this.select "moin")}}
            {{on "blur" this.deselect}}
          >
            {{~t "intro.title"~}},
          </a>
        </h1>
        {{#each FRAGMENTS as |fragment|}}
          {{! Links are inline, so a fragment still wraps across lines like the rest of the sentence. }}
          {{! The trailing whitespace stays inside the link, so the justified gap to the next fragment is still hoverable and does not fire mouseleave. }}
          <a
            class={{bem
              "fragment"
              (hash style=fragment is-selected=(this.isSelected fragment))
            }}
            href={{this.href fragment}}
            data-test-home-fragment={{fragment}}
            {{on "pointerup" (fn this.notePointer fragment)}}
            {{on "click" (fn this.open fragment)}}
            {{on "mouseenter" (fn this.select fragment)}}
            {{on "mouseleave" this.deselect}}
            {{on "focus" (fn this.select fragment)}}
            {{on "blur" this.deselect}}
          >
            {{~t (concat "intro.message." fragment)}}
          </a>
        {{/each}}
      </div>
    </div>
  </template>
}
