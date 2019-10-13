import Transform from 'ember-data/transform';
import { isBlank } from '@ember/utils';

const emptyMobiledoc = {
  version: "0.3.1",
  markups: [],
  atoms: [],
  cards: []
};

export default class JsonStringTransform extends Transform {
  deserialize(serialized) {
    if(isBlank(serialized) || !serialized.version) {
      return emptyMobiledoc;
    }

    return serialized;
  }

  serialize(deserialized) {
    if(isBlank(deserialized) || !deserialized.version) {
      return emptyMobiledoc;
    }

    return deserialized;
  }
}
