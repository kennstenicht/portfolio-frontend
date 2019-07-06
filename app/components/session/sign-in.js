import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default class SessionSignIn extends Component.extend(
  BEM
) {
  // Services
  @service session;


  // Defaults
  tagName = 'section';
  blockNames = 'c-sign-in';


  // Actions
  @action
  authenticate() {
    const credentials = {
      "auth": {
        "password": this.password,
        "email": this.identification
      }
    };
    const authenticator = 'authenticator:jwt';

    this.session.authenticate(authenticator, credentials)
      .then(this._authenticated.bind(this))
      .catch(this._rejected.bind(this));
  }


  // Privat functions
  _authenticated() {
    // eslint-disable-next-line no-console
    console.log('Loged in');
  }

  _rejected(reason) {
    // eslint-disable-next-line no-console
    console.log(reason);
  }
}
