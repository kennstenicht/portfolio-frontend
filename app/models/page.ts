import Model, { attr } from '@ember-data/model';

export default class PageModel extends Model {
  // Attributes
  @attr('string') declare content: any;
  @attr('string') declare html: any;
  @attr('string') declare metaTitle: string;
  @attr('string') declare metaDescription: string;
  @attr('string') declare title: string;
}
