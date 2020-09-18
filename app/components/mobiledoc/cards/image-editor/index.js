import Component from '@ember/component';

export default class MobiledocCardsImageEditorComponent extends Component {
  constructor() {
    super(...arguments);

    // check to see if card has existing payload value for image (if card is being re-edited)
    if (this.payload.imgSrc) {
      this.set('imgSrc', this.payload.imgSrc);
    }

    if (this.payload.alt) {
      this.set('alt', this.payload.alt);
    }
  }
}
