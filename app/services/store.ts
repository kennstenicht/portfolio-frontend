import Store from 'ember-date/store';
import { service } from '@ember/service';

export default class MyStore extends Store {
  @service declare requestManager;
}
