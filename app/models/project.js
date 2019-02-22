import Model from 'ember-data/model';
import { attr } from '@ember-decorators/data';
import { hasMany } from '@ember-decorators/data';

export default class ProjectModel extends Model {
  @attr('string') title;
  @attr('string') slug;
  @attr('string') subtitle;
  @attr('string') excerpt;
  @attr('string') metaInfo;
  @attr('string') content;
  @attr('boolean') visible;
  @attr('number') position;

  @hasMany('custom-field') customFields;
}
