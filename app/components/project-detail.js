import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { getOwner } from '@ember/application';
import BEM from 'ember-cli-bem/mixins/bem';

export default class ProjectDetailComponent extends Component.extend(
  BEM
) {
  // Defaults
  tagName = 'article';
  blockName = 'c-project-detail';


  // Computed properties
  @computed('project.slug')
  get projectTemplate() {
    let slug = this.project.slug;

    if (getOwner(this).lookup('template:components/project-detail/-' + slug)) {
      return 'components/project-detail/-' + slug;
    } else {
      return 'components/project-detail/-default';
    }
  }
}