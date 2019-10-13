import DS from 'ember-data';
import Model from 'ember-data/model';

export default class ProjectModel extends Model {
  @DS.attr('string') title;
  @DS.attr('string') slug;
  @DS.attr('string') subtitle;
  @DS.attr('mobiledoc') excerpt;
  @DS.attr('mobiledoc') metaInfo;
  @DS.attr('mobiledoc') content;
  @DS.attr('boolean') visible;
  @DS.attr('number') position;

  @DS.hasMany('custom-field') customFields;
}
