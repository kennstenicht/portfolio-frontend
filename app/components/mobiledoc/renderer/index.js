import Component from '@glimmer/component';
import tagNames from 'ember-mobiledoc-dom-renderer/mobiledoc-dom-renderer/utils/tag-names';
import { normalizeTagName } from 'ember-mobiledoc-dom-renderer/mobiledoc-dom-renderer/utils/dom';

export default class MobiledocRendererComponent extends Component {
  // Hooks
  constructor() {
    super(...arguments);

    const tempIsValidMarkerType = tagNames.isValidMarkerType;

    tagNames.isValidMarkerType = function (type) {
      if (normalizeTagName(type) === 'small') {
        return true;
      }

      if (normalizeTagName(type) === 'big') {
        return true;
      }

      return tempIsValidMarkerType(type);
    };
  }


  // Getter and setter
  get atomNames() {
    return ['mobiledoc/atoms/line-break'];
  }

  get cardNames() {
    return ['mobiledoc/cards/image'];
  }

  get myMarkupElementRenderer() {
    return {
      small: (tagName, domDocument) => {
        let element = domDocument.createElement('small');
        return element;
      },

      big: (tagName, domDocument) => {
        let element = domDocument.createElement('big');
        return element;
      }
    }
  }
}
