import { viewTransitionName } from '@cardstack/view-transitions';
import { hash } from '@ember/helper';
import type Owner from '@ember/owner';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import t from 'ember-intl/helpers/t';

import type { Project } from 'portfolio/data/project';
import ProjectSliderService from 'portfolio/services/project-slider';
import { getBem } from 'portfolio/utils/get-bem';

import Default from './default';
import MintEc from './mint-ec';
import styles from './styles.module.css';

export interface ProjectDetailSignature {
  Element: HTMLElement;
  Args: {
    project: Project;
  };
}

const bem = getBem(styles);

export default class ProjectDetail extends Component<ProjectDetailSignature> {
  // Services
  @service projectSlider!: ProjectSliderService;

  // Slider position
  constructor(owner: Owner, args: ProjectDetailSignature['Args']) {
    super(owner, args);

    this.projectSlider.position = this.args.project.position;
  }

  // Template
  <template>
    <article class={{bem (hash style=@project.id)}} ...attributes>
      <img
        class={{bem "preview-image"}}
        src={{@project.previewImage}}
        alt={{@project.title}}
        {{viewTransitionName "project-image-" @project.id}}
      />
      <div class={{bem "content"}}>
        <header class={{bem "header"}}>
          <div class={{bem "intro"}}>
            <hgroup class={{bem "heading"}}>
              <h1
                class={{bem "title"}}
                {{viewTransitionName "project-title-" @project.id}}
              >
                {{@project.title}}
              </h1>
              <p
                class={{bem "subtitle"}}
                {{viewTransitionName "project-subtitle-" @project.id}}
              >
                {{@project.subtitle}}
              </p>
            </hgroup>

            {{! template-lint-disable no-triple-curlies }}
            {{{@project.excerpt}}}
          </div>

          <dl class={{bem "meta-info"}}>
            {{#each-in @project.facts as |label value|}}
              <dt>{{label}}</dt>
              <dd>{{value}}</dd>
            {{/each-in}}
          </dl>
        </header>
        <div class={{bem "wrapper"}}>
          {{#let (getContentComponent @project.id) as |ContentComponent|}}
            <ContentComponent @project={{@project}} />
          {{/let}}
          <div class={{bem "back"}}>
            <LinkTo @route="projects" class={{bem "link"}} data-view-transition>
              {{t "projectDetail.backToOverview" htmlSafe=true}}
            </LinkTo>
          </div>
        </div>
      </div>
    </article>
  </template>
}

// Component utilities
const CONTENT_COMPONENTS = new Map([['mint-ec', MintEc]]);

const getContentComponent = (projectId: string | null) => {
  if (!projectId) {
    return null;
  }

  if (CONTENT_COMPONENTS.has(projectId)) {
    return CONTENT_COMPONENTS.get(projectId);
  }

  return Default;
};
