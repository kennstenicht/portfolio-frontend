import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  swiper: service(),

  // Defaults
  tagName: 'article',
  blockName: 'c-project-list',

  // Computed Properties
  swiperOptions: computed(function () {
    return {
      slidesPerView: 'auto',
      centeredSlides: true,
      grapCursor: true,
      freeMode: true,
      keyboardControl: true,
      mousewheelControl: true,
      mousewheelReleaseOnEdges: true,

      pagination: '.swiper-pagination',

      paginationClickable: true,

      slideClass: 'c-project-list-preview',
      slideActiveClass: 'c-project-list-preview--active',
      slideDuplicatedActiveClass: 'c-project-list-preview--duplicated-active',
      slideVisibleClass: 'c-project-list-preview--visible',
      slideDuplicateClass: 'c-project-list-preview--duplicatd',
      slideNextClass: 'c-project-list-preview--next',
      slideDuplicatedNextClass: 'c-project-list-preview--duplicated-next',
      slidePrevClass: 'c-project-list-preview--prev',
      slideDuplicatedPrevClass: 'c-project-list-preview--duplicated-prev'
    }
  }),

});
