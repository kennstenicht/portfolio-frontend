import Component from '@ember/component';
import { inject as service } from '@ember-decorators/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default class SessionSignOut extends Component.extend(
  BEM
) {
  // Services
  @service session;
  @service router;

  // Defaults
  tagName = 'span';
  blockNames = 'c-sign-out';

  // Events
  click() {
    this.session.invalidate();
  }
}
