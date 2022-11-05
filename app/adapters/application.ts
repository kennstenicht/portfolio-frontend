import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  urlForFindAll(modelName: string | number) {
    const path = this.pathForType(modelName);
    return `/api/${path}/all.json`;
  }

  urlForFindRecord(id: string, modelName: string | number) {
    const path = this.pathForType(modelName);
    return `/api/${path}/${id}.json`;
  }
}
