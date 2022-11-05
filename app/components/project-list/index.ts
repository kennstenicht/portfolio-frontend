import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Swiper, { Pagination, Keyboard, Mousewheel, Parallax } from 'swiper';
// @ts-ignore
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import TransitionContext from 'ember-animated/-private/transition-context';
import SwiperService from 'portfolio/services/swiper';

export default class ProjectListComponent extends Component {
  // Services
  @service swiper!: SwiperService;


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
  listTransition = function * (
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
  }.bind(this);
  /* eslint-enable require-yield */
}
