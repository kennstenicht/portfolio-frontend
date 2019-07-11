import Component from '@glimmer/component';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

export default class AppLicationFooterComponent extends Component {
  // Defaults
  block = 'c-application-footer';
  duration = 0;


  // Computed properties
  get currentYear() {
    return new Date().getFullYear();
  }


  // Functions
  setupAnimation(element) {
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '.c-application-footer',
        duration: 500,
        triggerHook: 1
      })
      .setClassToggle(element, 'c-application-footer--toggled')
      .addTo(controller);
  }
}
