import Component from '@ember/component';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Class bindings
  blockName: 'c-projects-overview',

  // Swiper Options
  swiperOptions: {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 40,
    grapCursor: true,
    freeMode: true,
    freeModeSticky: true,
    keyboardControl: true,
    mousewheelControl: true,
    mousewheelReleaseOnEdges: true,

    pagination: '.swiper-pagination',
    paginationClickable: true,

    slideClass: 'c-project-preview',
    slideActiveClass: 'c-project-preview--active',
    slideDuplicatedActiveClass: 'c-project-preview--duplicated-active',
    slideVisibleClass: 'c-project-preview--visible',
    slideDuplicateClass: 'c-project-preview--duplicatd',
    slideNextClass: 'c-project-preview--next',
    slideDuplicatedNextClass: 'c-project-preview--duplicated-next',
    slidePrevClass: 'c-project-preview--prev',
    slideDuplicatedPrevClass: 'c-project-preview--duplicated-prev',
  }
});
