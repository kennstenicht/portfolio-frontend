import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Swiper, { Pagination, Keyboard, Mousewheel, Parallax } from 'swiper';
import AnimatedEach from 'ember-animated/components/animated-each';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import TransitionContext from 'ember-animated/-private/transition-context';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
import SwiperService from 'portfolio/services/swiper';
import bem from 'portfolio/helpers/bem';
import Preview from './preview';
import styles from './styles.module.css';
import Project from 'portfolio/models/project';

interface Signature {
  Element: HTMLElement,
  Args: {
    projects: Project[],
  }
}

export default class ProjectListComponent extends Component<Signature> {
  // Services
  @service declare swiper: SwiperService;


  // Defaults
  duration: number = 600;


  // Actions
  @action
  initSwiper(element: HTMLElement) {
    Swiper.use([Pagination, Keyboard, Mousewheel, Parallax]);
    let swiperClass = element.classList[0];
    let itemElement = element.querySelector('[data-selector=swiper-item]');
    let itemClass = itemElement?.classList[0];

    this.swiper.instance = new Swiper(element, {
      slidesPerView: 'auto',
      centeredSlides: true,
      grabCursor: true,
      simulateTouch: true,
      parallax: true,
      freeMode: true,
      initialSlide: this.swiper.position,

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },

      mousewheel: {
        releaseOnEdges: true
      },

      // Classes
      wrapperClass: `${swiperClass}__wrapper`,
      slideClass: itemClass,
      slideActiveClass: `${itemClass}--active`,
      slideDuplicateActiveClass: `${itemClass}--duplicated-active`,
      slideVisibleClass: `${itemClass}--visible`,
      slideDuplicateClass: `${itemClass}--duplicatd`,
      slideNextClass: `${itemClass}--next`,
      slideDuplicateNextClass: `${itemClass}--duplicatd-next`,
      slidePrevClass: `${itemClass}--prev`,
      slideDuplicatePrevClass: `${itemClass}--duplicatd-prev`
    });
  }

  @action
  destroySwiper() {
    this.swiper.instance?.destroy(true, true);
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
    [...sentSprites, ...receivedSprites].forEach(sprite => {
      // Hide sprite! Animation is handled inside of project-list/preview
      sprite.hide();
    });

    insertedSprites.forEach(sprite => {
      const spriteIndex = sprite.owner?.index || 0;
      const isAfterReceivedSprite = this.swiper.position <= spriteIndex;
      const spriteWidth = sprite.finalBounds?.width || 0;
      const startLeft = - window.innerWidth - spriteWidth;
      const startRight = window.innerWidth * 2;
      const start = isAfterReceivedSprite ? startRight : startLeft;

      sprite.startAtPixel({ x: start });
      sprite.applyStyles({ 'z-index': '1'});

      move(sprite, { easing: easeOut });
    });

    removedSprites.forEach(sprite => {
      const spriteIndex = sprite.owner?.index || 0;
      const isAfterSentSprite = this.swiper.position <= spriteIndex;
      const spriteWidth = sprite.initialBounds?.width || 0;
      const endLeft = - window.innerWidth - spriteWidth;
      const endRight = window.innerWidth * 2;
      const end = isAfterSentSprite ? endRight: endLeft;

      sprite.endAtPixel({ x: end });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite, { easing: easeIn });
    });
  }
  /* eslint-enable require-yield */


  // Template
  <template>
    <div
      class={{bem styles}}
      {{didInsert this.initSwiper}}
      {{willDestroy this.destroySwiper}}
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
