import Component from '@glimmer/component';
import { concat, hash } from '@ember/helper';

import t from 'ember-intl/helpers/t';

import linkStyles from 'portfolio/assets/styles/objects/link.module.css';
import { bem } from 'portfolio/helpers/bem';

import styles from './styles.module.css';

const SOCIAL_MEDIA_LINKS = {
  github: 'https://github.com/kennstenicht',
  bluesky: 'https://bsky.app/profile/kennstenicht.bsky.social',
  linkedin: 'https://www.linkedin.com/in/christoph-wiedenmann',
};

interface Signature {
  Element: HTMLElement;
  Args: {
    isNavigationOpen?: boolean;
  };
}

export default class ApplicationFooterComponent extends Component<Signature> {
  // Getter and setter
  get currentYear() {
    return new Date().getFullYear();
  }

  // Template
  <template>
    <footer
      class={{bem styles (hash is-toggled=@isNavigationOpen)}}
      ...attributes
    >
      <div class={{bem styles "wrapper"}}>
        <ul class={{bem styles "social"}}>
          {{#each-in SOCIAL_MEDIA_LINKS as |type url|}}
            <li class={{bem styles "item"}}>
              <a
                href={{url}}
                rel="noopener noreferrer"
                target="_blank"
                class={{bem linkStyles}}
              >
                {{t (concat "application.footer.social." type)}}
              </a>
            </li>
          {{/each-in}}
        </ul>
        <div class={{bem styles "copy"}}>
          {{t "application.footer.copy" year=this.currentYear htmlSafe=true}}
        </div>
      </div>
    </footer>
  </template>
}
