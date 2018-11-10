import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";
import BEM from 'ember-cli-bem/mixins/bem';
import ScrollMagicComponentMixin from 'ember-scrollmagic/mixins/components/scene-mixin';

export default Component.extend(BEM, ScrollMagicComponentMixin, {
  // Services
  scrollMagic: service(),


  // Defaults
  tagName: 'footer',
  blockName: 'c-application-footer',
  duration: 0,


  // Computed properties
  currentYear: computed(function () {
    return new Date().getFullYear();
  }),


  // Functions
  setupScene() {
    let opts = this.mergedOptions,
        scene = new ScrollMagic.Scene(opts);

    scene.setClassToggle(this.element, 'c-application-footer--toggled')

    return scene;
  }
});
