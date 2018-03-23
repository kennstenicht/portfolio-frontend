import Route from '@ember/routing/route';
import { get } from '@ember/object';
import SetHeadTags from '../../mixins/set-head-tags';

export default Route.extend(SetHeadTags, {
  metaTitle: 'Projekte | Christoph Wiedenmann',
  metaDescription: 'Lorem ipsum',

  model() {
    return get(this, 'store').findAll('project').then(this._sortModel);
  },

  // Privat functions
  _sortModel(model) {
    return model.sortBy('position');
  },
});
