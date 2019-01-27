import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';
import Swiper from 'swiper';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

export default Component.extend(BEM, {
  // Services
  swiper: service(),

  // Defaults
  tagName: 'article',
  blockName: 'c-project-list',


  didInsertElement() {
    this._super(...arguments);

    // Swiper.use([Pagination, Keyboard, Mousewheel, Parallax]);

    new Swiper(this.element, {
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

      pagination: {
        el: '.c-project-list__pagination',
        clickable: true,
        // Classes
        bulletClass: 'o-project-list__bullet',
        bulletActiveClass: 'o-project-list__bullet--active',
        modifierClass: 'o-project-list__bullet--',
        currentClass: 'o-project-list__bullet--current',
        totalClass: 'o-project-list__bullet--total',
        hiddenClass: 'o-project-list__bullet--hidden'
      },

      // Classes
      wrapperClass: 'c-project-list__wrapper',
      slideClass: 'c-project-list-preview',
      slideActiveClass: 'c-project-list-preview--active',
      slideDuplicatedActiveClass: 'c-project-list-preview--duplicated-active',
      slideVisibleClass: 'c-project-list-preview--visible',
      slideDuplicateClass: 'c-project-list-preview--duplicatd',
      slideNextClass: 'c-project-list-preview--next',
      slideDuplicatedNextClass: 'c-project-list-preview--duplicated-next',
      slidePrevClass: 'c-project-list-preview--prev',
      slideDuplicatedPrevClass: 'c-project-list-preview--duplicated-prev'
    })
  },

  preserveScrollPosition: true,

  // eslint-disable-next-line require-yield
  listTransition: function * ({ insertedSprites, removedSprites, sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': 801
      });
    });

    insertedSprites.forEach(sprite => {
      const center = (window.innerWidth * 0.5) - (sprite.absoluteFinalBounds.width / 2);
      const start = sprite.absoluteFinalBounds.left >= center ? window.innerWidth * 2 : - sprite.finalBounds.width * 2;

      sprite.startAtPixel({ x: start });
      sprite.applyStyles({ 'z-index': 800 });
      move(sprite, { easing: easeOut });
    });

    removedSprites.forEach(sprite => {
      const center = (window.innerWidth * 0.5) - (sprite.absoluteInitialBounds.width / 2);
      const end = sprite.absoluteInitialBounds.left >= center ? window.innerWidth * 2 : - sprite.initialBounds.width * 2;

      sprite.applyStyles({ 'z-index': 800 });
      sprite.endAtPixel({ x: end });
      move(sprite, { easing: easeIn });
    });
  }
});
