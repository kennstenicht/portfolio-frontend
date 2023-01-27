import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { concat, hash, fn } from '@ember/helper';
import t from 'ember-intl/helpers/t';
// @ts-ignore
import inViewport from 'ember-in-viewport/modifiers/in-viewport';
import styles from './styles.module.css';
import linkStyles from 'portfolio/assets/styles/objects/link.module.css';
import bem from 'portfolio/helpers/bem';

const SOCIAL_MEDIA_LINKS = {
  github: 'https://github.com/kennstenicht',
  linkedin: 'https://www.linkedin.com/in/christoph-wiedenmann',
  twitter: 'https://twitter.com/herrwiedenmann',
};

interface Signature {
  Element: HTMLElement;
}

export default class AppLicationFooterComponent extends Component<Signature> {
  // Defaults
  @tracked isToggled: boolean = false;

  // Getter and setter
  get currentYear() {
    return new Date().getFullYear();
  }

  // Template
  <template>
    <footer
      class={{bem styles (hash is-toggled=this.isToggled)}}
      {{inViewport
        onEnter=(fn (mut this.isToggled) true)
        onExit=(fn (mut this.isToggled) false)
        viewportSpy=true
      }}
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
