import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';

import { t } from 'ember-intl';

import { bem } from 'portfolio/helpers/bem';
import fitText from 'portfolio/modifiers/fit-text';

import styles from './styles.module.css';

export default class ErrorTemplate extends Component {
  // Defaults
  @tracked selectedFragment?: string;
  fragments = [
    'i-am',
    'berlin-based',
    'senior-developer',
    'ux-background',
    'love-for-details',
    'many-frameworks',
    'diffenrent-languages',
    'prefer-ember',
    'love-to-learn-svelt',
  ];

  // Template
  <template>
    <div class={{bem styles}}>
      {{#if this.selectedFragment}}
        <img
          src={{concat "/assets/home/" this.selectedFragment ".jpg"}}
          alt={{t (concat "route.home.altText." this.selectedFragment)}}
          class={{bem styles "huge-image"}}
        />
      {{/if}}
      <div class={{bem styles "message"}} {{fitText}}>
        <h1
          class={{bem styles "title"}}
          {{on "mouseenter" (fn (mut this.selectedFragment) "moin")}}
          {{on "mouseleave" (fn (mut this.selectedFragment) undefined)}}
        >
          {{t "route.home.title"}}
        </h1>,
        {{#each this.fragments as |fragment|}}
          <span
            class={{bem styles fragment}}
            {{on "mouseenter" (fn (mut this.selectedFragment) fragment)}}
            {{on "mouseleave" (fn (mut this.selectedFragment) undefined)}}
          >
            {{~t (concat "route.home.message." fragment)~}}
          </span>
        {{/each}}
      </div>
    </div>
  </template>
}
