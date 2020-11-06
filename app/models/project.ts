import Model, { attr, hasMany } from '@ember-data/model';
import TextRenderer from 'ember-mobiledoc-text-renderer';
import CustomFieldModel from 'portfolio/models/custom-field';

export default class ProjectModel extends Model {
  // Attributes
  // @ts-ignore
  @attr('mobiledoc') content!: any;
  // @ts-ignore
  @attr('mobiledoc') excerpt!: any;
  // @ts-ignore
  @attr('mobiledoc') facts!: any;
  @attr('string') metaTitle!: string;
  @attr('string') metaDescription!: string;
  @attr('number') position!: number;
  @attr('string') slug!: string;
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
    if (!this.excerpt) {
      return '';
    }

    let textRenderer = new TextRenderer({cards: []});
    let rendered = textRenderer.render(this.excerpt);

    return rendered.result.replace(/(\r\n|\n|\r)/gm, "").trim();
  }

  get displayLabel(): string {
    return this.title;
  }
}
