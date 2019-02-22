import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  session: service(),
  router: service(),

  // Defaults
  tagName: 'span',
  blockNames: 'c-sign-out',

  // Events
  click() {
    this.session.invalidate();
  }
});
