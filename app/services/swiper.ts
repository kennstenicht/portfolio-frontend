import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Swiper from 'swiper';

export default class SwiperService extends Service {
  @tracked position: number = 0;
  instance?: Swiper;
}
