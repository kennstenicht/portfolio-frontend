import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';

export default Component.extend(BEM, {
  // Services
  router: service(),

  // Defaults
  tagName: 'article',
  blockName: 'c-project-list-preview',
  classNameBindings: ['slug'],
  duration: 600,

  // Computed Properties
  slug: computed('blockName', 'project.slug', function() {
    return this.blockName + '--' + this.project.slug;
  }),

  // Events
  click() {
    this.router.transitionTo('projects.show', this.project);
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
