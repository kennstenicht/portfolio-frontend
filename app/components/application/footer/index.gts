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

export interface ApplicationFooterSignature {
  Element: HTMLElement;
  Args: {
    isNavigationOpen?: boolean;
  };
}

const bem = getBem(styles);

export default class ApplicationFooter extends Component<ApplicationFooterSignature> {
  // Copyright
  get currentYear() {
    return new Date().getFullYear();
  }

  // Template
  <template>
    <footer
      class={{bem (hash is-toggled=@isNavigationOpen)}}
      data-test-footer
      ...attributes
    >
      <div class={{bem "wrapper"}} data-test-footer-wrapper>
        <ul class={{bem "social"}}>
          {{#each-in SOCIAL_MEDIA_LINKS as |type url|}}
            <li class={{bem "item"}}>
              <a
                class={{bem "link"}}
                href={{url}}
                rel="noopener noreferrer"
                target="_blank"
                data-test-social-link={{type}}
              >
                {{~t (concat "application.footer.social." type)~}}
              </a>
            </li>
          {{/each-in}}
        </ul>
        <div class={{bem "copy"}} data-test-copyright>
          {{t "application.footer.copy" year=this.currentYear htmlSafe=true}}
        </div>
      </div>
    </footer>
  </template>
}
