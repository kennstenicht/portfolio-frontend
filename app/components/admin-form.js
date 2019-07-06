import Component from '@ember/component';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default class AdminFormComponent extends Component {
  // Services
  @service router;
  @service intl;


  // Computed properties
  @computed('model.constructor.modelName')
  get headline() {
    const modelName = this.model.constructor.modelName;
    const mode = this.model.isNew ? 'new' : 'edit';

    return this.intl.t(`admin.${modelName}.headline.${mode}`);
  }

  @computed('model.constructor.modelName')
  get componentName() {
    let modelName = this.model.constructor.modelName;

    if(getOwner(this).lookup('template:components/admin-form/' + modelName)) {
      return 'admin-form/' + modelName;
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
    // TODO: add type to transition
    this.router.transitionTo('admin.pages');
  }

  _throwError(reason) {
    let error = reason.errors || reason;
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
