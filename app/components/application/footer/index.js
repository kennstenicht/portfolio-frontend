import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AppLicationFooterComponent extends Component {
  // Services
  @service inViewport


  // Defaults
  duration = 0;
  @tracked isToggled = false;


  // Getter and setter
  get currentYear() {
    return new Date().getFullYear();
  }


  // Actions
  @action
  setupInViewport(element) {
    const { onEnter, onExit } = this.inViewport.watchElement(element);

    onEnter(this.showFooter);
    onExit(this.hideFooter);
  }

  @action
  showFooter() {
    this.isToggled = true;
  }

  @action
  hideFooter() {
    this.isToggled = false;
  }
}
