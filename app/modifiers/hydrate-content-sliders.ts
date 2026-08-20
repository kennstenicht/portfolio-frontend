import { modifier } from 'ember-modifier';
import Swiper from 'swiper';
import { FreeMode, Keyboard, Pagination } from 'swiper/modules';

interface Signature {
  Element: HTMLElement;
  Args: {
    Named: Record<string, never>;
    // Re-runs setup whenever the rendered content changes.
    Positional: [content: string | null | undefined];
  };
}

export default modifier<Signature>((element) => {
  const swipers = Array.from(
    element.querySelectorAll<HTMLElement>('.content-slider'),
  ).map(
    (slider) =>
      new Swiper(slider, {
        modules: [FreeMode, Keyboard, Pagination],
        slidesPerView: 'auto',
        grabCursor: true,
        keyboard: { enabled: true, onlyInViewport: false },
        wrapperClass: 'content-slider__wrapper',
        slideClass: 'content-slider__slide',
      }),
  );

  return () => {
    swipers.forEach((swiper) => swiper.destroy(true, true));
  };
});
