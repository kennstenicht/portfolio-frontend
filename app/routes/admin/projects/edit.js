import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let projects = this.modelFor('admin.projects');

    return projects.findBy('id', params.id);
  }
});
