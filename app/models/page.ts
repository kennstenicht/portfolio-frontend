import Model, { attr, hasMany } from '@ember-data/model';
import TextRenderer from 'ember-mobiledoc-text-renderer';
import CustomFieldModel from 'portfolio/models/custom-field';

export default class PageModel extends Model {
  // Attributes
  // @ts-ignore
  @attr('mobiledoc') content!: any;
  @attr('string') metaTitle!: string;
  @attr('string') metaDescription!: string;
  @attr('string') slug!: string;
  @attr('number') position!: number;
  @attr('string') title!: string;


  // Relations
  @hasMany('custom-field') customFields?: CustomFieldModel;


  // Getter and setter
  get metaTitleFallback(): string {
    return this.title;
  }

  get metaDescriptionFallback(): string {
    if (!this.content) {
      return '';
    }

    let textRenderer = new TextRenderer({ cards: [] });
    let rendered = textRenderer.render(this.content);

    return rendered.result.replace(/(\r\n|\n|\r)/gm, "").trim();
  }

  get displayLabel(): string {
    return this.title;
  }
}
