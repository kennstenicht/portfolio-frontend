import Component from '@ember/component';
import BEM from 'ember-cli-bem/mixins/bem';

export default class ProjectDetailSummaryComponent extends Component.extend(
  BEM
) {
  // Defaults
  blockName = 'c-project-detail-summary';
}
