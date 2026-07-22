import { concat, fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import Metadata from 'portfolio/components/seo/metadata';
import fitText from 'portfolio/modifiers/fit-text';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

const bem = getBem(styles);

export default class ErrorTemplate extends Component {
  // Defaults
  @tracked selectedFragment?: string;
  fragments = [
    'i-am',
    'berlin-based',
    'senior-developer',
    'ux-background',
    'love-for-details',
    'currently-shipping',
    'learn-svelte',
  ];

  // Template
  <template>
    <Metadata
      @title={{t "route.application.meta.title"}}
      @description={{t "route.application.meta.description"}}
    />

    <div class={{(bem)}}>
      {{#if this.selectedFragment}}
        <img
          src={{concat "/assets/home/" this.selectedFragment ".jpg"}}
          alt={{t (concat "route.home.altText." this.selectedFragment)}}
          class={{bem "huge-image"}}
        />
      {{/if}}
      <div class={{bem "message"}} {{fitText}}>
        <h1
          class={{bem "title"}}
          {{on "mouseenter" (fn (mut this.selectedFragment) "moin")}}
          {{on "mouseleave" (fn (mut this.selectedFragment) undefined)}}
        >
          {{~t "route.home.title"~}},
        </h1>
        {{#each this.fragments as |fragment|}}
          <span
            class={{bem "fragment" (hash style=fragment)}}
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
