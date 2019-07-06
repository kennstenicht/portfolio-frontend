import Component from '@ember/component';
import { computed } from '@ember/object';
import BEM from 'ember-cli-bem/mixins/bem';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

export default class AppLicationFooterComponent extends Component.extend(
  BEM
) {
  // Defaults
  tagName = 'footer';
  blockName = 'c-application-footer';
  duration = 0;


  // Computed properties
  @computed
  get currentYear() {
    return new Date().getFullYear();
  }


  // Hooks
  didInsertElement() {
    this._super(...arguments);

    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '.c-application-footer',
        duration: 500,
        triggerHook: 1
      })
      .setClassToggle(this.element, 'c-application-footer--toggled')
      .addTo(controller);
  }
}
