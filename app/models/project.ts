import Model, { attr } from '@ember-data/model';

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
