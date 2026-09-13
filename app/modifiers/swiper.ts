import { modifier } from 'ember-modifier';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';

export interface SwiperSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      options: SwiperOptions;
    };
    Positional: [];
  };
}

const swiper = modifier<SwiperSignature>((element, _, { options }) => {
  if (import.meta.env.SSR) {
    return;
  }

  const instance = new Swiper(element, options);

  return () => {
    instance.destroy(true, true);
  };
});

export default swiper;
