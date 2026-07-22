import { concat, hash } from '@ember/helper';
import Component from '@glimmer/component';
import t from 'ember-intl/helpers/t';

import { getBem } from 'portfolio/utils/get-bem';

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

const bem = getBem(styles);

export default class ApplicationFooterComponent extends Component<Signature> {
  // Getter and setter
  get currentYear() {
    return new Date().getFullYear();
  }

  // Template
  <template>
    <footer class={{bem (hash is-toggled=@isNavigationOpen)}} ...attributes>
      <div class={{bem "wrapper"}}>
        <ul class={{bem "social"}}>
          {{#each-in SOCIAL_MEDIA_LINKS as |type url|}}
            <li class={{bem "item"}}>
              <a
                href={{url}}
                rel="noopener noreferrer"
                target="_blank"
                class={{bem "link"}}
              >
                {{~t (concat "application.footer.social." type)~}}
              </a>
            </li>
          {{/each-in}}
        </ul>
        <div class={{bem "copy"}}>
          {{t "application.footer.copy" year=this.currentYear htmlSafe=true}}
        </div>
      </div>
    </footer>
  </template>
}
