import Controller from '@ember/controller';
import ENV from 'portfolio/config/environment';
import { computed } from '@ember/object';

export default class ApllicationController extends Controller {
  // Computed properties
  @computed
  get isDevelopment() {
    return ENV.environment == 'development'
  }
}
