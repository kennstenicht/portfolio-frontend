import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AppLicationAdminNavigationComponent extends Component {
  // Services
  @service session;


  // Actions
  @action
  signOut() {
    this.session.invalidate();
  }
}
