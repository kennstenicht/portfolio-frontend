import Model, { attr, hasMany } from '@ember-data/model';
import TextRenderer from 'ember-mobiledoc-text-renderer';

export default class PageModel extends Model {
  // Attributes
  @attr('mobiledoc') content;
  @attr('string') metaTitle;
  @attr('string') metaDescription;
  @attr('string') slug;
  @attr('number') position;
  @attr('string') slug;
  @attr('string') title;


  // Relations
  @hasMany('custom-field') customFields;


  // Getter and setter
  get metaTitleFallback() {
    return this.title;
  }

  get metaDescriptionFallback() {
    let textRenderer = new TextRenderer({cards: []});
    let rendered = textRenderer.render(this.content);

    return rendered.result.replace(/(\r\n|\n|\r)/gm, "").trim();
  }
}
