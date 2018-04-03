import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('admin-form/custom-fields', 'Integration | Component | admin-form/custom-fields', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{admin-form/custom-fields}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#admin-form/custom-fields}}
      template block text
    {{/admin-form/custom-fields}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
