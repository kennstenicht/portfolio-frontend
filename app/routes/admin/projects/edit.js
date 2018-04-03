import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.modelFor('admin.projects')
      .findBy('id', params.id);
  }
});
