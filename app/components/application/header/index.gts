import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { hash, array, concat } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import RouterService from '@ember/routing/router-service';
import t from 'ember-intl/helpers/t';
import { timeout, task } from 'ember-concurrency';
import animatedIf from 'ember-animated/components/animated-if';
import fade from 'ember-animated/transitions/fade';
import { bem } from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import Logo from './logo/index';

interface Signature {
  Element: HTMLHeadElement;
  Args: {
    isNavigationOpen: boolean;
    setIsNavigationOpen: (isOpen: boolean) => void;
  };
}

export default class ApplicationHeaderComponent extends Component<Signature> {
  // Services
  @service declare router: RouterService;

  // Defaults
  @tracked menuLabel = 'menu';
  fadeTransition = fade;
  numberOfGenerations = 0;

  // Getter and setter
  get isProjectDetail() {
    return this.router.currentRoute?.name === 'projects.show';
  }

  // Functions
  @action
  closeNavigation() {
    // this.randomString.perform();
    this.args.setIsNavigationOpen(false);
  }

  @action
  toggleNavigation() {
    // this.randomString.perform();
    this.args.setIsNavigationOpen(!this.args.isNavigationOpen);
  }

  // Tasks
  // randomString = task(async () => {
  //   let possibleLetters = 'menuback';
  //   let string = '';

  //   await timeout(100);

  //   if (this.numberOfGenerations < 6) {
  //     this.numberOfGenerations++;

  //     for (var i = 0; i < 4; i++) {
  //       let randomIndex = Math.floor(Math.random() * possibleLetters.length);
  //       string += possibleLetters.charAt(randomIndex);
  //     }

  //     this.randomString.perform();
  //   } else {
  //     this.numberOfGenerations = 0;

  //     string = this.args.isNavigationOpen ? 'back' : 'menu';
  //   }

  //   this.menuLabel = string;
  // });

  // Template
  <template>
    <header
      class={{bem
        styles
        (hash
          is-navigation-open=@isNavigationOpen
          is-project-detail=this.isProjectDetail
        )
      }}
      ...attributes
    >
      <LinkTo
        @route="pages.home"
        class={{bem styles "logo"}}
        {{on "click" this.closeNavigation}}
      >
        <Logo />
      </LinkTo>

      <div class={{bem styles "navigation"}}>
        <div class={{bem styles "back-to-overview"}}>
          {{#animatedIf this.isProjectDetail use=this.fadeTransition}}
            <LinkTo @route="projects" {{on "click" this.closeNavigation}}>
              {{t "application.header.toOverview" htmlSafe=true}}
            </LinkTo>
          {{/animatedIf}}
        </div>

        <div
          class={{bem styles "toggle"}}
          role="button"
          {{on "click" this.toggleNavigation}}
        >
          <div class={{bem styles "label"}}>
            {{this.menuLabel}}
          </div>
          <div class={{bem styles "burger"}}>
            <div class={{bem styles "layer" (hash is-top=true)}}></div>
            <div class={{bem styles "layer" (hash is-middle=true)}}></div>
            <div class={{bem styles "layer" (hash is-bottom=true)}}></div>
          </div>
        </div>
      </div>

      <nav class={{bem styles "navigation-overlay"}}>
        <div>
          <ul class={{bem styles "list"}}>
            <li class={{bem styles "item"}}>
              <LinkTo @route="projects" {{on "click" this.closeNavigation}}>
                {{t "application.header.projects"}}
              </LinkTo>
            </li>
            <li class={{bem styles "item"}}>
              <LinkTo
                @route="pages.show"
                @model="about"
                {{on "click" this.closeNavigation}}
              >
                {{t "application.header.about"}}
              </LinkTo>
            </li>
          </ul>
          <ul class={{bem styles "list"}}>
            {{#each (array "imprint" "privacy") as |page|}}
              <li class={{bem styles "item" (hash is-small=true)}}>
                <LinkTo
                  @route="pages.show"
                  @model={{page}}
                  {{on "click" this.closeNavigation}}
                >
                  {{t (concat "navigation." page)}}
                </LinkTo>
              </li>
            {{/each}}
          </ul>
        </div>
      </nav>
    </header>
  </template>
}
