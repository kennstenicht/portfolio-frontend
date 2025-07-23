import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = '';
  namespace = 'api';

  urlForFindAll(modelName: string) {
    const path = this.pathForType(modelName);
    return `/api/${path}/index.json`;
  }

  urlForFindRecord(id: string, modelName: string) {
    const path = this.pathForType(modelName);
    return `/api/${path}/${id}.json`;
  }
}
