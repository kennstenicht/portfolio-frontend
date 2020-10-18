import Transform from '@ember-data/serializer/transform';
import { isBlank } from '@ember/utils';

const emptyMobiledoc = {
  version: "0.3.1",
  markups: [],
  atoms: [],
  cards: []
};

export default class JsonStringTransform extends Transform {
  deserialize(serialized: any) {
    if(isBlank(serialized) || !serialized.version) {
      return emptyMobiledoc;
    }

    return serialized;
  }

  serialize(deserialized: any) {
    if(isBlank(deserialized) || !deserialized.version) {
      return emptyMobiledoc;
    }

    return deserialized;
  }
}
