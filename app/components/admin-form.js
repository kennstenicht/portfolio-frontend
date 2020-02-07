import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AdminFormComponent extends Component {
  // Services
  @service intl;


  // Defaults
  block = 'c-admin-form';


  // Computed properties
  get modelName() {
    return this.args.record.constructor.modelName;
  }

  get headline() {
    const action = this.args.record.isNew ? 'new' : 'edit';

    return this.intl.t(`admin.${this.modelName}.headline.${action}`);
  }
}
