import { concat, fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import fitText from 'portfolio/modifiers/fit-text';
import { getBem } from 'portfolio/utils/get-bem';

import FragmentLink, { type Fragment, LINKS } from './fragment-link';
import iAm from './images/i-am.png';
import leadDeveloper from './images/lead-developer.png';
import moin from './images/moin.png';
import playfulIdeas from './images/playful-ideas.png';
import productsThatLast from './images/products-that-last.png';
import uxBackground from './images/ux-background.png';
import styles from './styles.module.css';

const bem = getBem(styles);

const IMAGES: Record<Fragment, string> = {
  moin,
  'i-am': iAm,
  'lead-developer': leadDeveloper,
  'ux-background': uxBackground,
  'products-that-last': productsThatLast,
  'playful-ideas': playfulIdeas,
};

const FRAGMENTS: Fragment[] = [
  'i-am',
  'lead-developer',
  'ux-background',
  'products-that-last',
  'playful-ideas',
];

export interface IntroSignature {
  Element: HTMLDivElement;
}

export default class Intro extends Component<IntroSignature> {
  // Fragments
  @tracked selectedFragment?: Fragment;

  get hasSelection() {
    return this.selectedFragment !== undefined;
  }

  get selectedImage() {
    return this.selectedFragment && IMAGES[this.selectedFragment];
  }

  get proof() {
    if (!this.selectedFragment) {
      return;
    }

    const [route, model] = LINKS[this.selectedFragment];

    return { fragment: this.selectedFragment, route, model };
  }

  select = (fragment: Fragment) => {
    this.selectedFragment = fragment;
  };

  // Tapping the proof link fires the emulated mouseleave and blur on the
  // fragment before the link's click. Deselecting then would remove the link
  // before the click arrives, and the click is what the page transition
  // needs.
  deselect = (event: Event) => {
    const { relatedTarget } = event as FocusEvent | MouseEvent;

    if (
      relatedTarget instanceof Element &&
      relatedTarget.closest(`.${bem('proof')}`)
    ) {
      return;
    }

    this.selectedFragment = undefined;
  };

  isSelected = (fragment: Fragment) => this.selectedFragment === fragment;

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
      <div
        class={{bem "message" (hash has-selection=this.hasSelection)}}
        {{fitText}}
      >
        <h1 class={{bem "title"}}>
          <FragmentLink
            @fragment="moin"
            @select={{fn this.select "moin"}}
            @deselect={{this.deselect}}
            class={{bem
              "fragment"
              (hash style="moin" is-selected=(this.isSelected "moin"))
            }}
          >
            {{~t "intro.title"~}},
          </FragmentLink>
        </h1>
        {{#each FRAGMENTS as |fragment|}}
          {{! Links are inline, so a fragment still wraps across lines like the rest of the sentence. }}
          <FragmentLink
            @fragment={{fragment}}
            @select={{fn this.select fragment}}
            @deselect={{this.deselect}}
            class={{bem
              "fragment"
              (hash style=fragment is-selected=(this.isSelected fragment))
            }}
          >
            {{~t (concat "intro.message." fragment)}}
          </FragmentLink>
        {{/each}}
      </div>
      {{#if this.proof}}
        <LinkTo
          @route={{this.proof.route}}
          @model={{this.proof.model}}
          class={{bem "proof"}}
          data-test-home-proof={{this.proof.fragment}}
          {{on "blur" this.deselect}}
        >
          {{t (concat "intro.proof." this.proof.fragment)}}
        </LinkTo>
      {{/if}}
    </div>
  </template>
}
