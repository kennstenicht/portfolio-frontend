import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  router: service(),

  // Defaults
  tagName: 'article',
  blockName: 'c-project-list-preview',
  classNameBindings: ['slug'],
  attributeBindings: ['data-preview-background'],

  // Computed Properties
  slug: computed('blockName', 'project.slug', function() {
    return this.blockName + '--' + this.project.slug;
  }),

  // Events
  click() {
    this.router.transitionTo('projects.show', this.project);
  }
});
