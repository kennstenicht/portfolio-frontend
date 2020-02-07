import Model, { attr, hasMany } from '@ember-data/model';
import TextRenderer from 'ember-mobiledoc-text-renderer';

export default class ProjectModel extends Model {
  // Attributes
  @attr('mobiledoc') content;
  @attr('mobiledoc') excerpt;
  @attr('mobiledoc') facts;
  @attr('string') metaTitle;
  @attr('string') metaDescription;
  @attr('number') position;
  @attr('string') slug;
  @attr('string') subtitle;
  @attr('string') title;
  @attr('boolean') visible;


  // Relations
  @hasMany('custom-field') customFields;


  // Getter and setter
  get metaTitleFallback() {
    return `${this.title} » ${this.subtitle}`;
  }

  get metaDescriptionFallback() {
    let textRenderer = new TextRenderer({cards: []});
    let rendered = textRenderer.render(this.excerpt);

    return rendered.result.replace(/(\r\n|\n|\r)/gm, "").trim();
  }

  get displayLabel() {
    return this.title;
  }
}
