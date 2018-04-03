import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.modelFor('admin.pages')
      .findBy('id', params.id);
  }
});
