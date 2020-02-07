import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AppLicationFooterComponent extends Component {
  // Services
  @service fastboot;


  // Defaults
  block = 'c-application-footer';
  duration = 0;


  // Computed properties
  get currentYear() {
    return new Date().getFullYear();
  }

  constructor() {
    super(...arguments);
  }


  // Functions
  @action
  setupAnimation(element) {
    if (this.fastboot.isFastBoot) {
      return
    }

    import('scrollmagic')
      .then((ScrollMagic) => {
        const controller = new ScrollMagic.Controller();

        new ScrollMagic.Scene({
            triggerElement: '.c-application-footer',
            duration: 500,
            triggerHook: 1
          })
          .setClassToggle(element, 'c-application-footer--toggled')
          .addTo(controller);
      });
  }
}
