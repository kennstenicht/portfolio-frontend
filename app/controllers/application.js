import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'portfolio/config/environment';

export default Controller.extend({
  // Computed properties
  isDevelopment: computed(function () {
    return ENV.environment == 'development'
  }),
});
