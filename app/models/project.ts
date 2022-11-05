import Model, { attr, hasMany } from '@ember-data/model';
import CustomFieldModel from 'portfolio/models/custom-field';

export default class ProjectModel extends Model {
  // Attributes
  @attr('string') content!: any;
  @attr('string') html!: any;
  @attr('string') description!: any;
  @attr() excerpt!: any;
  @attr() facts!: any;
  @attr('string') metaTitle!: string;
  @attr('string') metaDescription!: string;
  @attr('number') position!: number;
  @attr('string') subtitle!: string;
  @attr('string') title!: string;
  @attr('boolean') visible!: boolean;


  // Relations
  @hasMany('custom-field') customFields?: CustomFieldModel;


  // Getter and setter
  get metaTitleFallback(): string {
    return `${this.title} » ${this.subtitle}`;
  }

  get metaDescriptionFallback(): string {
    return this.description;
  }

  get displayLabel(): string {
    return this.title;
  }
}
