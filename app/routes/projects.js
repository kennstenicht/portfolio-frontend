import Route from '@ember/routing/route';
import SetHeadTags from '../mixins/set-head-tags';

export default Route.extend(SetHeadTags, {
  metaTitle: 'projekte << christoph wiedenmann',
  metaDescription: 'Lorem ipsum',
});
