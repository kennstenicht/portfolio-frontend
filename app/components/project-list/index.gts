import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

import {
  FreeMode,
  Pagination,
  Keyboard,
  Mousewheel,
  Parallax,
} from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import { animatedEach, type TransitionContext } from 'ember-animated';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

import ProjectSliderService from 'portfolio/services/project-slider';
import swiper from 'portfolio/modifiers/swiper';
import { bem } from 'portfolio/helpers/bem';
import Project from 'portfolio/models/project';

import Preview from './preview';
import previewStyles from './preview/styles.module.css';
import styles from './styles.module.css';
import { cached } from '@glimmer/tracking';

interface Signature {
  Element: HTMLElement;
  Args: {
    projects: Project[];
  };
}

export default class ProjectListComponent extends Component<Signature> {
  // Services
  @service declare projectSlider: ProjectSliderService;

  // Defaults
  duration = 600;

  // Getter and setter
  get sortedProjects() {
    return this.args.projects.slice().sort((a, b) => a.position - b.position);
  }

  @cached
  get swiperOptions(): SwiperOptions {
    return {
      modules: [FreeMode, Pagination, Keyboard, Mousewheel, Parallax],
      slidesPerView: 'auto',
      centeredSlides: true,
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

      // Classes
      wrapperClass: styles['wrapper'],
      slideClass: previewStyles['scope'],
      slideActiveClass: previewStyles['scope--is-active'],
    };
  }

  // Functions
  @action
  // eslint-disable-next-line require-yield
  *listTransition(
    this: ProjectListComponent,
    {
      insertedSprites,
      removedSprites,
      sentSprites,
      receivedSprites,
    }: TransitionContext,
  ) {
    [...sentSprites, ...receivedSprites].forEach((sprite) => {
      // Hide sprite! Animation is handled inside of project-list/preview
      sprite.hide();
    });

    insertedSprites.forEach((sprite) => {
      const spriteIndex = sprite.owner?.index || 0;
      const isAfterReceivedSprite = this.projectSlider.position <= spriteIndex;
      const spriteWidth = sprite.finalBounds?.width || 0;
      const startLeft = -window.innerWidth - spriteWidth;
      const startRight = window.innerWidth * 2;
      const start = isAfterReceivedSprite ? startRight : startLeft;

      sprite.startAtPixel({ x: start });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite, { easing: easeOut });
    });

    removedSprites.forEach((sprite) => {
      const spriteIndex = sprite.owner?.index || 0;
      const isAfterSentSprite = this.projectSlider.position <= spriteIndex;
      const spriteWidth = sprite.initialBounds?.width || 0;
      const endLeft = -window.innerWidth - spriteWidth;
      const endRight = window.innerWidth * 2;
      const end = isAfterSentSprite ? endRight : endLeft;

      sprite.endAtPixel({ x: end });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite, { easing: easeIn });
    });
  }

  // Template
  <template>
    <div
      class={{bem styles}}
      {{swiper options=this.swiperOptions}}
      ...attributes
    >
      <div class={{bem styles "wrapper"}}>
        {{#animatedEach
          this.sortedProjects
          initialInsertion=true
          finalRemoval=true
          use=this.listTransition
          duration=this.duration
          as |project index|
        }}
          <Preview @project={{project}} @index={{index}} />
        {{/animatedEach}}
      </div>
    </div>
  </template>
}
