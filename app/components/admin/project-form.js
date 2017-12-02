import Component from '@ember/component';
import { set } from '@ember/object';


export default Component.extend({
  actions: {
    save(model) {
      model.save();
      this.sendAction('saved');
    }
  }
});
