import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AppLicationComponent extends Component {
  // Services
  @service router;


  // Defaults
  block = 'c-application';


  // Computed Properties
  @computed('router.currentURL')
  get urlSegments() {
    return this.router
      .currentURL
      .substring(1)
      .split('/')
      .filter(n => n);
  }
}
