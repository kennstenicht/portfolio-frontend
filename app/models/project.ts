import Model, { attr } from '@ember-data/model';

export default class ProjectModel extends Model {
  // Attributes
  @attr('string') declare content: any;
  @attr('string') declare html: any;
  @attr('string') declare excerpt: string;
  @attr('string') declare facts: any;
  @attr('string') declare metaTitle: string;
  @attr('string') declare metaDescription: string;
  @attr('number') declare position: number;
  @attr('string') declare subtitle: string;
  @attr('string') declare title: string;
  @attr('boolean') declare visible: boolean;
}
