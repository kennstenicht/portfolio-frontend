import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { getOwner } from '@ember/application';

export default class AdminForm extends Component {
  // Services
  @service router;


  // Computed properties
  @computed('model.constructor.modelName')
  get formTemplate() {
    let modelName = this.model.constructor.modelName;

    if(getOwner(this).lookup('template:components/admin-form/-' + modelName)) {
      return 'components/admin-form/-' + modelName;
    } else {
      return 'components/admin-form/-default';
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
    // TODO: add type to transition
    this.router.transitionTo('admin.pages');
  }

  _throwError(reason) {
    let error = reason.errors || reason;
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
