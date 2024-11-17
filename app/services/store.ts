import BaseStore from 'ember-date/store';
import { service } from '@ember/service';
import RequestManager from './request-manager';

export default class Store extends BaseStore {
  @service declare requestManager: RequestManager;
}
