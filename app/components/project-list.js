import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';
import Swiper from 'swiper';

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
      grapCursor: true,
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
  }
});
