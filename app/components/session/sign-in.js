import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { bind } from '@ember/runloop';
import { get } from '@ember/object';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  session: service(),


  // Class bindings
  blockNames: 'c-sign-in',


  // Actions
  actions: {
    signIn: function(provider) {
      get(this,'session').open('firebase', {
        provider: provider,
        email: get(this,'email'),
        password: get(this,'password')
      }).then(bind(this, function(data) {
        this.sendAction('signedIn');
      }));
    }
  }
});
