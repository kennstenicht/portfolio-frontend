import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { set } from '@ember/object';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  session: service(),

  // Defaults
  tagName: 'section',
  blockNames: 'c-sign-in',

  // Actions
  actions: {
    authenticate: function() {
      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:token';

      this.get('session').authenticate(authenticator, credentials).catch((reason) => {
        set(this, 'errorMessage', reason.error || reason);
      });
    }
  }
});
