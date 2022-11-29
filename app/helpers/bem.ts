import { helper } from '@ember/component/helper';

interface IClassNames {
  [className: string]: string;
}

interface Modifiers {
  [key: string]: string | boolean | string[];
}

export function bem(
  positional: [IClassNames] | [IClassNames, string],
  named: Record<string, Modifiers>
) {
  let [module, element] = positional;
  let { modifiers } = named;
  let classes: string[] = [];
  let baseClass = !element ? 'scope' : element;

  if (!module) {
    return '';
  }

  classes.push(baseClass);

  if (modifiers) {
    Object.keys(modifiers).forEach((key) => {
      let modifier = modifiers?.[key];

      if (!modifier) {
        return;
      }

      if (typeof modifier === 'boolean') {
        if (modifier) {
          classes.push(`${baseClass}--${key}`);
        }
      } else if (Array.isArray(modifier)) {
        modifier.forEach((modifier) => {
          classes.push(`${baseClass}--${key}-${modifier}`);
        });
      } else {
        classes.push(`${baseClass}--${key}-${modifier}`);
      }
    });
  }

  return classes.map((className) => module[className]).join(' ');
}

export default helper(bem);
