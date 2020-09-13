import Component from '@ember/component';

export default class MobiledocCardsImageEditorComponent extends Component {
  constructor() {
    super(...arguments);

    // check to see if card has existing payload value for image (if card is being re-edited)
    if (this.get('payload.imgSrc')) {
      this.set('imgSrc', this.get('payload.imgSrc'));
    }

    if (this.get('payload.alt')) {
      this.set('alt', this.get('payload.alt'));
    }
  }
}
