import Component from '@ember/component';
import { className } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import BEM from 'ember-cli-bem/mixins/bem';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';

export default class ProjectListPreviewComponent extends Component.extend(
  BEM
) {
  // Services
  @service router;

  // Defaults
  tagName = 'article';
  blockName = 'c-project-list-preview';
  duration = 600;

  // Computed Properties
  @className
  @computed('blockName', 'project.slug')
  get slug() {
    return this.blockName + '--' + this.project.slug;
  }

  // Events
  click() {
    this.router.transitionTo('projects.show', this.project);
  }

  // eslint-disable-next-line require-yield
  backgroundTransition = function * ({ sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': 802
      });
    });

    receivedSprites.forEach(parallel(move, resize));
    sentSprites.forEach(parallel(move, resize));
  }

  // eslint-disable-next-line require-yield
  typoTransition = function * ({ sentSprites, receivedSprites }) {
    receivedSprites.concat(sentSprites).forEach(sprite => {
      sprite.applyStyles({
        'z-index': 803
      });
    });

    receivedSprites.forEach(move);
    sentSprites.forEach(move);
  }
}
