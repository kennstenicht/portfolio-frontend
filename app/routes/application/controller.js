import Controller from '@ember/controller';
import ENV from 'portfolio/config/environment';

export default class ApplicationController extends Controller {
  // Getter and setter
  get isDevelopment() {
    return ENV.environment == 'development'
  }
}
