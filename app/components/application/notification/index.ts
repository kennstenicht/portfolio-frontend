import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import FlashObject from 'ember-cli-flash/flash/object';

interface Args {
  flash: FlashObject
}

export default class ApplicationNotificationComponent extends Component<Args> {
  // Actions
  @action
  preventExiting() {
    const flash = this.args.flash;

    if (isPresent(flash)) {
      flash.preventExit();
    }
  }

  @action
  allowExiting() {
    const flash = this.args.flash;

    if (isPresent(flash) && !flash.exiting) {
      flash.allowExit();
    }
  }
}
