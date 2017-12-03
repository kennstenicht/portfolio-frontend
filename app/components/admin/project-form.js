import Component from '@ember/component';

export default Component.extend({
  actions: {
    save(model) {
      model.save();
      this.sendAction('saved');
    }
  }
});
