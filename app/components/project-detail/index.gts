import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { LinkTo } from '@ember/routing';
import { hash } from '@ember/helper';
import AnimatedValue from 'ember-animated/components/animated-value';
import t from 'ember-intl/helpers/t';
import ProjectModel from 'portfolio/models/project';
import { bem } from 'portfolio/helpers/bem';
import SwiperService from 'portfolio/services/swiper';
import link from 'portfolio/assets/styles/objects/link.module.css';
import styles from './styles.module.css';
import Header from './header';
import Summary from './summary';
import AdHoc from './ad-hoc';
import Binuu from './binuu';
import DisasterMgmt from './disaster-mgmt';
import Eels from './eels';
import Flutkoerper from './flutkoerper';

const CONTENT_COMPONENTS: {[key: string]: any} = {
  'ad-hoc': AdHoc,
  binuu: Binuu,
  'disaster-mgmt': DisasterMgmt,
  eels: Eels,
  flutkoerper: Flutkoerper,
};

const getContentComponent = (project: string) => {
  return CONTENT_COMPONENTS[project];
};

interface Signature {
  Element: HTMLElement;
  Args: {
    project: ProjectModel;
  }
}

export default class ProjectDetail extends Component<Signature> {
  // Services
  @service swiper!: SwiperService;

  // Hooks
  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    this.swiper.position = this.args.project.position;
  }

  // Template
  <template>
    <AnimatedValue @value={{@project}} as |project|>
      <article
        class={{bem styles (hash style=project.id)}}
        ...attributes
      >
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
    </AnimatedValue>
  </template>
}
