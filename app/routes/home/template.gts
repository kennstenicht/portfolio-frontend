import { concat, fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ResponsiveImage } from '@responsive-image/ember';
import { t } from 'ember-intl';

import Metadata from 'portfolio/components/seo/metadata';
import fitText from 'portfolio/modifiers/fit-text';
import { getBem } from 'portfolio/utils/get-bem';

import iAm from './images/i-am.png?responsive';
import leadDeveloper from './images/lead-developer.png?responsive';
import moin from './images/moin.png?responsive';
import playfulIdeas from './images/playful-ideas.png?responsive';
import productsThatLast from './images/products-that-last.png?responsive';
import uxBackground from './images/ux-background.png?responsive';
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

export default class ErrorTemplate extends Component {
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

  // Template
  <template>
    <Metadata
      @title={{t "route.application.meta.title"}}
      @description={{t "route.application.meta.description"}}
    />

    <div class={{(bem)}}>
      {{#if this.selectedImage}}
        <ResponsiveImage
          @src={{this.selectedImage}}
          @sizes="100vw"
          class={{bem "huge-image"}}
          alt={{t (concat "route.home.altText." this.selectedFragment)}}
          data-test-home-image={{this.selectedFragment}}
        />
      {{/if}}
      <div class={{bem "message"}} {{fitText}}>
        <h1
          class={{bem "title"}}
          tabindex="0"
          {{on "mouseenter" (fn this.select "moin")}}
          {{on "mouseleave" this.deselect}}
        >
          {{~t "route.home.title"~}},
        </h1>
        {{#each FRAGMENTS as |fragment|}}
          {{! Focusable spans, not buttons: a button cannot wrap across lines, and focus also covers a tap on touch screens. }}
          {{! The trailing whitespace stays inside the span, so the justified gap to the next fragment is still hoverable and does not fire mouseleave. }}
          <span
            class={{bem
              "fragment"
              (hash style=fragment is-selected=(this.isSelected fragment))
            }}
            tabindex="0"
            data-test-home-fragment={{fragment}}
            {{on "mouseenter" (fn this.select fragment)}}
            {{on "mouseleave" this.deselect}}
            {{on "focus" (fn this.select fragment)}}
            {{on "blur" this.deselect}}
          >
            {{~t (concat "route.home.message." fragment)}}
          </span>
        {{/each}}
      </div>
    </div>
  </template>
}
