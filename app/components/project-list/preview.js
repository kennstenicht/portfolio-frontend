import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';

export default class ProjectListPreviewComponent extends Component {
  // Services
  @service router;


  // Defaults
  block = 'c-project-list-preview';
  duration = 600;


  // Functions
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
