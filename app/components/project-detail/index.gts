import { hash } from '@ember/helper';
import type Owner from '@ember/owner';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { animatedValue } from 'ember-animated';
import t from 'ember-intl/helpers/t';

import { bem } from 'portfolio/helpers/bem';
import ProjectModel from 'portfolio/models/project';
import ProjectSliderService from 'portfolio/services/project-slider';

import Default from './default';
import Header from './header';
import MintEc from './mint-ec';
import styles from './styles.module.css';
import Summary from './summary';

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
              <LinkTo @route="projects" class={{bem styles "link"}}>
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
