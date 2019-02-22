import Model from 'ember-data/model';
import { attr } from '@ember-decorators/data';
import { hasMany } from '@ember-decorators/data';

export default class PageModel extends Model {
  @attr('string') title;
  @attr('string') slug;
  @attr('string') content;
  @attr('number') position;

  @hasMany('custom-field') customFields;
}
