import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AppLicationFooterComponent extends Component {
  // Services
  @service fastboot;


  // Defaults
  duration = 0;
  @tracked isToggled = false;


  // Getter and setter
  get currentYear() {
    return new Date().getFullYear();
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
            triggerElement: element,
            duration: 500,
            triggerHook: 1
          })
          .on('change', () => {
            console.log('test');
            this.isToggled = !this.isToggled;
          })
          .addTo(controller);
      });
  }
}
