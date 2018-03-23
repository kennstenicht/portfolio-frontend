import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  router: service(),

  // Defaults
  tagName: 'article',
  blockName: 'c-project-preview',
  classNameBindings: ['slug'],
  attributeBindings: ['data-preview-background'],

  // Computed Properties
  slug: computed(function() {
    return get(this, 'blockName') + '--' + get(this, 'project.slug');
  }),

  // Events
  click() {
    get(this, 'router').transitionTo('projects.show', get(this, 'project'));
  }
});
