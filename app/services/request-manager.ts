import { LegacyNetworkHandler } from '@ember-data/legacy-compat';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class Requests extends RequestManager {
  constructor(args?: Record<string | symbol, unknown>) {
    super(args);
    this.use([LegacyNetworkHandler, Fetch]);
  }
}
