import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ProjectSliderService extends Service {
  @tracked position: number = 0;
}
