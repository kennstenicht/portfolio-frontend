import Model, { attr, hasMany } from '@ember-data/model';
import CustomFieldModel from 'portfolio/models/custom-field';

export default class PageModel extends Model {
  // Attributes
  @attr('string') content!: any;
  @attr('string') html!: any;
  @attr('string') description!: any;
  @attr('string') metaTitle!: string;
  @attr('string') metaDescription!: string;
  @attr('string') title!: string;


  // Relations
  @hasMany('custom-field') customFields?: CustomFieldModel;


  // Getter and setter
  get metaTitleFallback(): string {
    return this.title;
  }

  get metaDescriptionFallback(): string {
    return this.description;
  }

  get displayLabel(): string {
    return this.title;
  }
}
