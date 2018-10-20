import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";
import BEM from 'ember-cli-bem/mixins/bem';
import ScrollMagicComponentMixin from 'ember-scrollmagic/mixins/components/scene-mixin';

export default Component.extend(BEM, ScrollMagicComponentMixin, {
  // Services
  scrollMagic: service(),

  // Tag
  tagName: 'footer',

  // Scrollmagic scene settings
  duration: 0,

  // Class bindings
  blockName: 'c-application-footer',

  // Computed properties
  currentYear: computed(function () {
    return new Date().getFullYear();
  }),

  setupScene() {
    let opts = this.mergedOptions,
        scene = new ScrollMagic.Scene(opts);

    scene.setClassToggle(this.element, 'c-application-footer--toggled')

    return scene;
  }
});
