import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SessionSignIn extends Component {
  // Services
  @service session;


  // Actions
  @action
  authenticate(event) {
    event.preventDefault();

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
