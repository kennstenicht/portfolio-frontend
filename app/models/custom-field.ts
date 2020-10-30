import Model, { attr } from '@ember-data/model';

export default class CustomFieldModel extends Model {
  @attr('string') key!: string;
  @attr('string') value!: string;
}
