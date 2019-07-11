import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AppLicationHeaderComponent extends Component {
  // Services
  @service session;


  // Defaults
  block = 'c-application-header';


  // Actions
  @action
  signOut() {
    this.session.invalidate();
  }
}
