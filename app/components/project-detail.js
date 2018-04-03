import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
  // Computed properties
  projectTemplate: computed('project.slug', function () {
    let slug = get(this,'project.slug');

    if(getOwner(this).lookup('template:components/project-detail/-' + slug)) {
      return 'components/project-detail/-' + slug;
    } else {
      return 'components/project-detail/-default';
    }
  }),
});
