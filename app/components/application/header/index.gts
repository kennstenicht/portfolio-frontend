import { array, concat, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';
import t from 'ember-intl/helpers/t';

import type PixelOverlayService from 'portfolio/services/pixel-overlay';
import { getBem } from 'portfolio/utils/get-bem';

import Logo from './logo/index';
import styles from './styles.module.css';

export interface ApplicationHeaderSignature {
  Element: HTMLHeadElement;
  Args: {
    isNavigationOpen: boolean;
    setIsNavigationOpen: (isOpen: boolean) => void;
  };
}

const bem = getBem(styles);

export default class ApplicationHeader extends Component<ApplicationHeaderSignature> {
  // Services
  @service declare pixelOverlay: PixelOverlayService;
  @service declare router: RouterService;

  // Back to overview
  get isProjectDetail() {
    return this.router.currentRoute?.name === 'projects.show';
  }

  // Navigation
  // Listening on the header rather than on each link runs this after the
  // link's own click handler, so the route sees the transition while the
  // navigation still covers the page.
  closeNavigationOnLink = async (event: MouseEvent) => {
    if (
      !this.args.isNavigationOpen ||
      !(event.target as Element).closest('a')
    ) {
      return;
    }

    await this.setIsNavigationOpen(false);
  };

  toggleNavigation = async () => {
    await this.setIsNavigationOpen(!this.args.isNavigationOpen);
  };

  setIsNavigationOpen = async (isOpen: boolean) => {
    this.args.setIsNavigationOpen(isOpen);

    void (isOpen
      ? this.pixelOverlay.cover('navigation')
      : this.pixelOverlay.reveal('navigation'));

    await this.randomString.perform();
  };

  // Toggle label
  @tracked menuLabel = 'menu';
  numberOfGenerations = 0;

  randomString = task(async () => {
    await timeout(100);

    if (this.numberOfGenerations < 6) {
      const possibleLetters = 'menuback';
      let string = '';

      this.numberOfGenerations++;

      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * possibleLetters.length);
        string += possibleLetters.charAt(randomIndex);
      }

      this.menuLabel = string;
      await this.randomString.perform();
    } else {
      this.numberOfGenerations = 0;
      this.menuLabel = this.args.isNavigationOpen ? 'back' : 'menu';
    }
  });

  // Template
  <template>
    {{! Delegates the links' clicks, which the keyboard reaches through the links themselves. }}
    <header
      {{! template-lint-disable no-invalid-interactive }}
      class={{bem
        (hash
          is-navigation-open=@isNavigationOpen
          is-project-detail=this.isProjectDetail
        )
      }}
      data-test-header
      ...attributes
      {{on "click" this.closeNavigationOnLink}}
    >
      <LinkTo @route="home" class={{bem "logo"}} data-test-logo-link>
        <Logo />
      </LinkTo>

      <div class={{bem "navigation"}}>
        <div
          class={{bem
            "back-to-overview"
            (hash is-project-detail=this.isProjectDetail)
          }}
          data-test-back-to-overview
        >
          <LinkTo
            @route="projects"
            data-view-transition
            data-test-back-to-overview-link
          >
            {{t "application.header.toOverview" htmlSafe=true}}
          </LinkTo>
        </div>

        <div
          class={{bem "toggle"}}
          role="button"
          data-test-navigation-toggle
          {{on "click" this.toggleNavigation}}
        >
          <div class={{bem "label"}} data-test-navigation-toggle-label>
            {{this.menuLabel}}
          </div>
          <div class={{bem "burger"}}>
            <div class={{bem "layer" (hash is-top=true)}}></div>
            <div class={{bem "layer" (hash is-middle=true)}}></div>
            <div class={{bem "layer" (hash is-bottom=true)}}></div>
          </div>
        </div>
      </div>

      <nav class={{bem "navigation-overlay"}} data-test-navigation-overlay>
        <div>
          <ul class={{bem "list"}}>
            <li class={{bem "item"}}>
              <LinkTo
                @route="projects"
                class={{bem "link"}}
                data-test-navigation-link="projects"
              >
                {{t "application.header.projects"}}
              </LinkTo>
            </li>
            <li class={{bem "item"}}>
              <LinkTo
                @route="page"
                @model="about"
                class={{bem "link"}}
                data-test-navigation-link="about"
              >
                {{t "application.header.about"}}
              </LinkTo>
            </li>
          </ul>
          <ul class={{bem "list"}}>
            {{#each (array "imprint" "privacy") as |pageSlug|}}
              <li class={{bem "item" (hash is-small=true)}}>
                <LinkTo
                  @route="page"
                  @model={{pageSlug}}
                  class={{bem "link"}}
                  data-test-navigation-link={{pageSlug}}
                >
                  {{t (concat "application.header." pageSlug)}}
                </LinkTo>
              </li>
            {{/each}}
          </ul>
        </div>
      </nav>
    </header>
  </template>
}
