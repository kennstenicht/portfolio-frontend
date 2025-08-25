import Component from '@glimmer/component';
import { service } from '@ember/service';
import { LinkTo } from '@ember/routing';
import { hash } from '@ember/helper';
import type Owner from '@ember/owner';

import { animatedValue } from 'ember-animated';
import t from 'ember-intl/helpers/t';

import ProjectModel from 'portfolio/models/project';
import { bem } from 'portfolio/helpers/bem';
import ProjectSliderService from 'portfolio/services/project-slider';
import link from 'portfolio/assets/styles/objects/link.module.css';

import styles from './styles.module.css';
import Header from './header';

import Default from './default';
import Summary from './summary';
import MintEc from './mint-ec';

interface Signature {
  Element: HTMLElement;
  Args: {
    project: ProjectModel;
  };
}

export default class ProjectDetail extends Component<Signature> {
  // Services
  @service projectSlider!: ProjectSliderService;

  // Hooks
  constructor(owner: Owner, args: Signature['Args']) {
    super(owner, args);

    this.projectSlider.position = this.args.project.position;
  }

  // Template
  <template>
    {{#animatedValue @project as |project|}}
      <article class={{bem styles (hash style=project.id)}} ...attributes>
        <Header @project={{project}} />
        <div class={{bem styles "content"}}>
          <Summary @project={{project}} />
          <div class={{bem styles "wrapper"}}>
            {{#let (getContentComponent project.id) as |ContentComponent|}}
              <ContentComponent @project={{project}} />
            {{/let}}
            <div class={{bem styles "back"}}>
              <LinkTo @route="projects" class={{bem link}}>
                {{t "projectDetail.backToOverview" htmlSafe=true}}
              </LinkTo>
            </div>
          </div>
        </div>
      </article>
    {{/animatedValue}}
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
