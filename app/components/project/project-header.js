import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  swiper: service(),

  // Attribute bidnings
  attributeBindings: ['data-slug'],

  // Class bindings
  blockName: 'c-project-header',
  classNameBindings: ['slug'],

  slug: computed(function () {
    return get(this, 'blockName') + '--' + get(this, 'project.slug');
  }),

  didInsertElement() {
    this._super(...arguments);

    set(this, 'swiper.position', get(this, 'project.position'));
  },
});
