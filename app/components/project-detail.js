import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { getOwner } from '@ember/application';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Defaults
  tagName: 'article',
  blockName: 'c-project-detail',

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
