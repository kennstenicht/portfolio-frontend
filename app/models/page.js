import DS from 'ember-data';
import Model from 'ember-data/model';

export default class PageModel extends Model {
  @DS.attr('string') title;
  @DS.attr('string') slug;
  @DS.attr('string') content;
  @DS.attr('number') position;

  @DS.hasMany('custom-field') customFields;
}
