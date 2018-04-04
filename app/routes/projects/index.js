import Route from '@ember/routing/route';
import SetHeadTags from '../../mixins/set-head-tags';

export default Route.extend(SetHeadTags, {
  metaTitle: 'Projekte | Christoph Wiedenmann',
  metaDescription: 'Lorem ipsum',

  model() {
    return this.modelFor('projects');
  }
});
