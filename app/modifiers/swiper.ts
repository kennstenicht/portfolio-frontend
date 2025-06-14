import { modifier } from 'ember-modifier';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';

interface Signature {
  Element: HTMLElement;
  Args: {
    Named: {
      options: SwiperOptions;
    };
    Positional: [];
  };
}

export default modifier<Signature>((element, _, { options }) => {
  const swiper = new Swiper(element, options);

  return () => {
    swiper.destroy(true, true);
  };
});
