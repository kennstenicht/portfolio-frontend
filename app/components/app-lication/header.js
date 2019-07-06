import Component from '@ember/component';
import { inject as service } from '@ember/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default class AppLicationHeaderComponent extends Component.extend(
  BEM
) {
  // Services
  @service session;


  // Defaults
  tagName = 'header';
  blockName = 'c-application-header';
}
