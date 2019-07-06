
import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';

export function bem(params, { modifiers }) {
  let [block, element] = params;
  let classes = [];
  let baseClass = !isEmpty(element) ? `${block}__${element}` : block;

  classes.push(baseClass);

  if(modifiers) {
    Object.keys(modifiers).forEach((key) => {
      let modifier = modifiers[key];

      if(typeof modifier === 'boolean') {
        let type = modifier ? 'is' : 'is-not';
        classes.push(`${baseClass}--${type}-${key}`);
      } else if(isArray(modifier)) {
        modifier.forEach((modifier) => {
          classes.push(`${baseClass}--${key}-${modifier}`);
        });
      } else {
        classes.push(`${baseClass}--${key}-${modifier}`);
      }
    });
  }

  return classes.join(' ');
}

export default helper(bem);
