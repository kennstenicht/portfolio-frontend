import Component from '@ember/component';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';

export default Component.extend(BEM, {
  // Services
  swiper: service(),

  // Defaults
  tagName: 'header',
  blockName: 'c-project-detail-header',
  duration: 600,

  // Hooks
  didInsertElement() {
    this._super(...arguments);

    set(this, 'swiper.position', this.project.position);
  },


  // eslint-disable-next-line require-yield
  backgroundTransition: function * ({ sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': 802
      });
    });

    receivedSprites.forEach(parallel(move, resize));
    sentSprites.forEach(parallel(move, resize));
  },

  // eslint-disable-next-line require-yield
  typoTransition: function * ({ sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': 803
      });
    });

    receivedSprites.forEach(move);
    sentSprites.forEach(move);
  }
});
