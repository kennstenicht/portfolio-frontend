import Model from 'ember-data/model';
import { attr } from '@ember-decorators/data';

export default class CustomFieldModel extends Model {
  @attr('string') key;
  @attr('string') value;
}
