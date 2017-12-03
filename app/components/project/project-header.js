import Component from '@ember/component';
import { computed, get } from '@ember/object';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Attribute bidnings
  attributeBindings: ['data-slug'],

  // Class bindings
  blockName: 'c-project-header',
  classNameBindings: ['slug'],

  slug: computed(function () {
    return get(this, 'blockName') + '--' + get(this, 'project.slug');
  })
});
