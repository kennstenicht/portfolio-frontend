import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { array, concat, hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import t from 'ember-intl/helpers/t';
import InViewportService from 'ember-in-viewport/services/in-viewport';
import styles from './styles.module.css';
import link from 'portfolio/assets/styles/objects/link.module.css';
import bem from 'portfolio/helpers/bem';

const SOCIAL_MEDIA_LINKS = {
  github: 'https://github.com/kennstenicht',
  linkedin: 'https://www.linkedin.com/in/christoph-wiedenmann',
  twitter: 'https://twitter.com/herrwiedenmann',
};

export default class AppLicationFooterComponent extends Component {
  // Services
  @service declare inViewport: InViewportService;

  // Defaults
  duration: number = 0;
  @tracked isToggled: boolean = false;

  // Getter and setter
  get currentYear() {
    return new Date().getFullYear();
  }

  // Functions
  @action
  setupInViewport(element) {
    const { onEnter, onExit } = this.inViewport.watchElement(element);

    onEnter(this.showFooter);
    onExit(this.hideFooter);
  }

  @action
  showFooter() {
    this.isToggled = true;
  }

  @action
  hideFooter() {
    this.isToggled = false;
  }

  // Template
  <template>
    <footer
      class={{bem styles modifiers=(hash is-toggled=this.isToggled)}}
      {{didInsert this.setupInViewport}}
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
                class={{bem link}}
              >
                {{t
                  (concat "application.footer.social." type)
                }}{{!
          }}</a>
            </li>
          {{/each-in}}
        </ul>
        <div class={{bem styles "copy"}}>
          {{t "application.footer.copy" year=this.currentYear htmlSafe=true}}
          |
          {{#each (array "imprint" "privacy") as |page|}}
            <LinkTo
              @route="pages.show"
              @model={{page}}
              class="{{bem styles 'item'}} {{bem link}}"
            >
              {{t (concat "navigation." page)}}
            </LinkTo>
          {{/each}}
        </div>
      </div>
    </footer>
  </template>
}
