import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';
import IntlService from 'ember-intl/services/intl';
import { action } from '@ember/object';

interface Args {
  records: any,
  modelName: string
}

export default class ListComponent extends Component<Args> {
  // Services
  @service intl!: IntlService;


  // Getter and setter
  get sortedRecords(): Array<any> {
    return this.args.records.sortBy('position');
  }

  get editRoute(): string {
    let modelName = this.args.modelName;

    return `admin.${pluralize(modelName)}.${modelName}`;
  }

  get newRoute(): string {
    let modelName = this.args.modelName;

    return `admin.${pluralize(modelName)}.new`;
  }

  get headline(): string {
    let modelName = this.args.modelName;

    return this.intl.t(`models.plural.${modelName}`);
  }


  // Actions
  @action
  reorderRecords(newRecords: Array<any>) {
    newRecords.forEach((record, index) => {
      record.position = index;
      record.save();
    });
  }
}
