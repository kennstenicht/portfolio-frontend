import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';

export default class ProjectDetailHeaderComponent extends Component {
  // Services
  @service swiper;


  // Defaults
  block = 'c-project-detail-header';
  duration = 600;


  // Hooks
  constructor() {
    super(...arguments);

    this.swiper.position = this.args.project.position;
  }


  // eslint-disable-next-line require-yield
  backgroundTransition = function * ({ sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': '802'
      });
    });

    receivedSprites.forEach(parallel(move, resize));
    sentSprites.forEach(parallel(move, resize));
  }

  // eslint-disable-next-line require-yield
  typoTransition = function * ({ sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': '803'
      });
    });

    receivedSprites.forEach(move);
    sentSprites.forEach(move);
  }
}
