import Component from '@ember/component';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { pluralize } from 'ember-inflector';

export default class AdminFormComponent extends Component {
  // Services
  @service router;
  @service intl;


  // Computed properties
  @computed('model.constructor.modelName')
  get modelName() {
    return this.model.constructor.modelName;
  }

  @computed('model.isNew', 'modelName')
  get headline() {
    const action = this.model.isNew ? 'new' : 'edit';

    return this.intl.t(`admin.${this.modelName}.headline.${action}`);
  }

  @computed('modelName')
  get componentName() {
    if(getOwner(this).lookup('template:components/admin-form/' + this.modelName)) {
      return 'admin-form/' + this.modelName;
    } else {
      return 'admin-form/default';
    }
  }


  // Actions
  @action
  save() {
    Promise.all(this.model.customFields.invoke('save'))
      .then((customFields) => {
        this.model.set('customFields', customFields);
        this.model.save()
          .then(this._transitionToIndex.bind(this))
          .catch(this._throwError.bind(this));
      })
      .catch(this._throwError.bind(this));

  }

  @action
  deleteRecord() {
    this.model.destroyRecord()
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
