import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  content: DS.attr('string'),
  position: DS.attr('number'),

  customFields: DS.hasMany('custom-field')
});
