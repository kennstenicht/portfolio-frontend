import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HeadDataService extends Service {
  // Services
  @service router;


  // Defaults
  @tracked title = 'christoph wiedenmann » a berlin based front-end engenieer & ux-designer';
  @tracked description = 'lorem ipsum';
  @tracked image = 'images/default_sharing.jpg';
  @tracked type = 'website';
  @tracked url = 'https://wiedenmann.io';


  // Hooks
  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', (transition) => {
      this.url = this.router.urlFor(transition.to.name);
    });
  }
}
