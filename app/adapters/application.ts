import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from 'portfolio/config/environment';
import SessionService from 'ember-simple-auth/services/session';
import IntlService from 'ember-intl/services/intl';
import FastbootService from 'ember-cli-fastboot/services/fastboot';

interface Headers {
  Authorization?: string,
}

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Services
  @service session!: SessionService;
  @service intl!: IntlService;
  @service fastboot!: FastbootService;


  // Computed properties
  @computed('fastboot.request.{protocol,host}')
  get host(): string {
    let protocol = ENV.environment !== 'development' ? 'https' : 'http';

    if (ENV.environment !== 'development' && this.fastboot.isFastBoot) {
      return protocol + '://' + this.fastboot.request.host;
    } else {
      return '';
    }
  }

  @computed('session.data.locale')
  get namespace(): string {
    let locale = this.intl.locale || 'de';

    return [locale, 'v1'].join('/');
  }

  @computed('session.data.authenticated.jwt')
  get headers(): Headers {
    let headers: Headers = {};
    let jwt = this.session.data?.authenticated?.jwt;

    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    return headers;
  }
}
