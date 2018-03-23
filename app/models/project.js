import DS from 'ember-data';

const Project = DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  subtitle: DS.attr('string'),
  excerpt: DS.attr('string'),
  metaInfo: DS.attr('string'),
  visible: DS.attr('boolean'),

  position: DS.attr('number')
});

export default Project;
