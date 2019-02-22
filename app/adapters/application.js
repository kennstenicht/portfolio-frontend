import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default class ApplicationAdapter extends DS.JSONAPIAdapter.extend(AdapterFetch, DataAdapterMixin) {
  // Defaults
  namespace = 'api/v1';

  // Hooks
  authorize(xhr) {
    let { jwt } = this.session.data.authenticated;
    xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);
  }
}
