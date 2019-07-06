import DS from 'ember-data';
import Model from 'ember-data/model';

export default class CustomFieldModel extends Model {
  @DS.attr('string') key;
  @DS.attr('string') value;
}
