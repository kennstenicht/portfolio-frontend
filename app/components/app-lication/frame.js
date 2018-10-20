import Component from '@ember/component';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Defaults
  blockName: 'c-application-frame',


  // Hooks
  didInsertElement() {
    this._super(...arguments);

    window.addEventListener('mousemove', this.animateFrame.bind(this));
  },

  willDestroyElement() {
    this._super(...arguments);

    window.removeEventListener('mousemove', this.animateFrame.bind(this));
  },


  // Functions
  animateFrame(event) {
    let mappedPositionX = event.clientX / window.outerWidth;
    let mappedPositionY = event.clientY / window.outerHeight;

    this.element.style.borderLeftWidth = mappedPositionX * 50 + 'px ';
    this.element.style.borderRightWidth = (1 - mappedPositionX) * 30 + 'px ';

    this.element.style.borderTopWidth = mappedPositionY * 50 + 'px ';
    this.element.style.borderBottomWidth = (1 - mappedPositionY) * 30 + 'px ';

  }
});
