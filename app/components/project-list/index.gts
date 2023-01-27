import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { FreeMode, Pagination, Keyboard, Mousewheel, Parallax } from 'swiper';
import AnimatedEach from 'ember-animated/components/animated-each';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import TransitionContext from 'ember-animated/-private/transition-context';
import SwiperService from 'portfolio/services/swiper';
import swiper from 'portfolio/modifiers/swiper';
import bem from 'portfolio/helpers/bem';
import Project from 'portfolio/models/project';
import Preview from './preview';
import previewStyles from './preview/styles.module.css';
import styles from './styles.module.css';

interface Signature {
  Element: HTMLElement;
  Args: {
    projects: Project[];
  };
}

export default class ProjectListComponent extends Component<Signature> {
  // Services
  @service declare swiper: SwiperService;

  // Defaults
  duration: number = 600;

  // Getter and setter
  get swiperOptions() {
    return {
      modules: [FreeMode, Pagination, Keyboard, Mousewheel, Parallax],
      slidesPerView: 'auto',
      centeredSlides: true,
      grabCursor: true,
      simulateTouch: true,
      parallax: true,
      initialSlide: this.swiper.position,

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
      wrapperClass: styles.wrapper,
      slideClass: previewStyles.scope,
      slideActiveClass: previewStyles['scope--is-active']
    }
  }

  // Functions
  @action
  *listTransition(
    this: ProjectListComponent,
    {
      insertedSprites,
      removedSprites,
      sentSprites,
      receivedSprites,
    }: TransitionContext
  ) {
    [...sentSprites, ...receivedSprites].forEach((sprite) => {
      // Hide sprite! Animation is handled inside of project-list/preview
      sprite.hide();
    });

    insertedSprites.forEach((sprite) => {
      const spriteIndex = sprite.owner?.index || 0;
      const isAfterReceivedSprite = this.swiper.position <= spriteIndex;
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
      const isAfterSentSprite = this.swiper.position <= spriteIndex;
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
        <AnimatedEach
          @items={{@projects}}
          @initialInsertion={{true}}
          @finalRemoval={{true}}
          @use={{this.listTransition}}
          @duration={{this.duration}}
          as |project index|
        >
          <Preview
            @project={{project}}
            @index={{index}}
            data-selector="swiper-item"
          />
        </AnimatedEach>
      </div>
    </div>
  </template>
}
