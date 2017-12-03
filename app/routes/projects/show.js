import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  model(params) {
    return get(this, 'store').query('project', {
      orderBy: 'slug',
      equalTo: params.project_slug
    }).then(function(data) {
      return data.get('firstObject');
    });
  },

  serialize(model){
    return {
      project_slug: get(model, 'slug')
    };
  },
});
