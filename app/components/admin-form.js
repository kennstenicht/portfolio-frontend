import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';

export default class AdminFormComponent extends Component {
  // Services
  @service router;
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


  // Actions
  @action
  save() {
    Promise.all(this.args.record.customFields.invoke('save'))
      .then((customFields) => {
        this.args.record.set('customFields', customFields);
        this.args.record.save()
          .then(this._transitionToIndex.bind(this))
          .catch(this._throwError.bind(this));
      })
      .catch(this._throwError.bind(this));

  }

  @action
  deleteRecord() {
    this.args.record.destroyRecord()
      .then(this._transitionToIndex.bind(this))
      .catch(this._throwError.bind(this));
  }


  // Privat functions
  _transitionToIndex() {
    let indexRoute = pluralize(this.modelName);
    // TODO: add type to transition
    this.router.transitionTo(`admin.${indexRoute}`);
  }

  _throwError(reason) {
    let error = reason.errors || reason;
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
