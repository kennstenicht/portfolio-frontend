import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Swiper from 'swiper';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

export default class ProjectListComponent extends Component {
  // Services
  @service swiper;

  // Defaults
  preserveScrollPosition = true;
  duration = 600;


  // Functions
  @action
  initSwiper(element) {
    // Swiper.use([Pagination, Keyboard, Mousewheel, Parallax]);
    let swiperClass = element.classList[0];
    let itemElement = element.querySelector('[data-selector=swiper-item]');
    let itemClass = itemElement.classList[0];

    this.swiper.instance = new Swiper(element, {
      slidesPerView: 'auto',
      centeredSlides: true,
      grapCursor: false,
      simulateTouch: false,
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
      slideDuplicatedActiveClass: `${itemClass}--duplicated-active`,
      slideVisibleClass: `${itemClass}--visible`,
      slideDuplicateClass: `${itemClass}--duplicatd`,
      slideNextClass: `${itemClass}--next`,
      slideDuplicatedNextClass: `${itemClass}--duplicatd-next`,
      slidePrevClass: `${itemClass}--prev`,
      slideDuplicatedPrevClass: `${itemClass}--duplicatd-prev`
    });
  }

  @action
  destroySwiper() {
    this.swiper.instance.destroy();
  }

  // eslint-disable-next-line require-yield
  listTransition = function * ({
    insertedSprites,
    removedSprites,
    sentSprites,
    receivedSprites
  }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': '801'
      });
    });

    insertedSprites.forEach(sprite => {
      const center = (window.innerWidth * 0.5) - (sprite.absoluteFinalBounds.width / 2);
      const start = sprite.absoluteFinalBounds.left >= center ? window.innerWidth * 2 : - sprite.finalBounds.width * 2;

      sprite.startAtPixel({
        x: start
      });
      sprite.applyStyles({
        'z-index': '800'
      });

      move(sprite, { easing: easeOut });
    });

    removedSprites.forEach(sprite => {
      const center = (window.innerWidth * 0.5) - (sprite.absoluteInitialBounds.width / 2);
      const end = sprite.absoluteInitialBounds.left >= center ? window.innerWidth * 2 : - sprite.initialBounds.width * 2;

      sprite.applyStyles({
        'z-index': '800'
      });
      sprite.endAtPixel({
        x: end
      });
      move(sprite, { easing: easeIn });
    });
  }
}
