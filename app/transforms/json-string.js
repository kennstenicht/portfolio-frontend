import Transform from 'ember-data/transform';
import { isBlank } from '@ember/utils';

export default class JsonStringTransform extends Transform {
  deserialize(serialized) {
    return isBlank(serialized) ? {} : JSON.parse(serialized);
  }

  serialize(deserialized) {
    return isBlank(deserialized) ? '{}' : JSON.stringify(deserialized);
  }
}
