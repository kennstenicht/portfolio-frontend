import { service } from '@ember/service';
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import type Swiper from 'swiper';
import {
  FreeMode,
  Keyboard,
  Mousewheel,
  Pagination,
  Parallax,
} from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

import type { Project } from 'portfolio/data/project';
import swiper from 'portfolio/modifiers/swiper';
import ProjectSliderService from 'portfolio/services/project-slider';
import { getBem } from 'portfolio/utils/get-bem';

import Preview from './preview';
import previewStyles from './preview/styles.module.css';
import ScrollIndicator from './scroll-indicator';
import styles from './styles.module.css';

export interface ProjectListSignature {
  Element: HTMLElement;
  Args: {
    projects: Project[];
  };
}

const bem = getBem(styles);

export default class ProjectList extends Component<ProjectListSignature> {
  // Services
  @service declare projectSlider: ProjectSliderService;

  // Projects
  get sortedProjects() {
    return this.args.projects.slice().sort((a, b) => a.position - b.position);
  }

  // Slider
  @cached
  get swiperOptions(): SwiperOptions {
    return {
      modules: [FreeMode, Pagination, Keyboard, Mousewheel, Parallax],
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: '12%',
      grabCursor: true,
      simulateTouch: true,
      parallax: true,
      initialSlide: this.projectSlider.position ?? 0,

      freeMode: {
        enabled: true,
        minimumVelocity: 0.2,
        momentum: false,
      },

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },

      mousewheel: {
        releaseOnEdges: true,
      },

      on: {
        progress: this.updateScrollIndicator,
      },

      // Classes
      wrapperClass: styles['wrapper'],
      slideClass: previewStyles['scope'],
      slideActiveClass: previewStyles['scope--is-active'],
    };
  }

  // Scroll indicator
  updateScrollIndicator = (swiper: Swiper, progress: number) => {
    const steps = swiper.slides.length - 1;

    swiper.el.style.setProperty(
      '--scroll-indicator-progress',
      `${Math.min(progress * steps, 1)}`,
    );
  };

  // Template
  <template>
    <div class={{(bem)}} {{swiper options=this.swiperOptions}} ...attributes>
      <ScrollIndicator />

      <div class={{bem "wrapper"}}>
        {{#each this.sortedProjects as |project index|}}
          <Preview @project={{project}} @index={{index}} />
        {{/each}}
      </div>
    </div>
  </template>
}
