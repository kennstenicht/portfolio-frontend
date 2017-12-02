import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  session: service(),


  // Class bidnings
  blockNames: 'c-sign-out',


  // Actions
  actions: {
    signOut: function() {
      get(this,'session').close();
    },
  }
});
