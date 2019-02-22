import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, DataAdapterMixin, {
  namespace: 'api/v1',

  // Hooks
  authorize(xhr) {
    let { jwt } = this.session.data.authenticated;
    xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);
  }
});
