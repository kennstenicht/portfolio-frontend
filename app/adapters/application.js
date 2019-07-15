import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'portfolio/config/environment';

export default class ApplicationAdapter extends DS.JSONAPIAdapter.extend(
  DataAdapterMixin
) {
  // Services
  @service intl;
  @service session;
  @service fastboot;


  // Computed properties
  @computed('fastboot.request.{protocol,host}')
  get host() {
    let protocol = ENV.environment !== 'development' ? 'https' : 'http';

    if (ENV.environment !== 'development' && this.fastboot.isFastBoot) {
      return protocol + '://' + this.fastboot.request.host;
    } else {
      return null;
    }
  }

  @computed('session.data.locale')
  get namespace() {
    let locale = this.intl.locale || 'de';

    return [locale, 'v1'].join('/');
  }

  // Hooks
  authorize(xhr) {
    let { jwt } = this.session.data.authenticated;
    xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);
  }
}
