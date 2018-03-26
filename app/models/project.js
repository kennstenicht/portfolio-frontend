import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  subtitle: DS.attr('string'),
  excerpt: DS.attr('string'),
  metaInfo: DS.attr('string'),
  visible: DS.attr('boolean'),

  position: DS.attr('number')
});
