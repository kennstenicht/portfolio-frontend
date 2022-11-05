import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import FastbootService from 'ember-cli-fastboot/services/fastboot';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Services
  @service fastboot!: FastbootService;


  // Computed properties


  urlForFindAll(modelName: string) {
    const path = this.pathForType(modelName);
    return `/api/${path}/all.json`;
  }

  urlForFindRecord(id: string, modelName: string) {
    console.log(id, modelName);

    const path = this.pathForType(modelName);
    return `/api/${path}/${id}.json`;
  }
}
