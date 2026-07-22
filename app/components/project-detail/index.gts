import { hash } from '@ember/helper';
import type Owner from '@ember/owner';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { animatedValue } from 'ember-animated';
import t from 'ember-intl/helpers/t';

import ProjectModel from 'portfolio/models/project';
import ProjectSliderService from 'portfolio/services/project-slider';
import { getBem } from 'portfolio/utils/get-bem';

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

const bem = getBem(styles);

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
      <article class={{bem (hash style=project.id)}} ...attributes>
        <Header @project={{project}} />
        <div class={{bem "content"}}>
          <Summary @project={{project}} />
          <div class={{bem "wrapper"}}>
            {{#let (getContentComponent project.id) as |ContentComponent|}}
              <ContentComponent @project={{project}} />
            {{/let}}
            <div class={{bem "back"}}>
              <LinkTo @route="projects" class={{bem "link"}}>
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
