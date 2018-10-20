import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  session: service(),

  // Class bindings
  tagName: 'header',
  blockName: 'c-application-header',
});
