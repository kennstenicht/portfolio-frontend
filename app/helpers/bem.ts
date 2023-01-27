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
  const [module, element] = positional;
  const { modifiers } = named;
  const classes: string[] = [];
  const baseClass = !element ? 'scope' : element;

  if (!module) {
    return '';
  }

  classes.push(baseClass);

  if (modifiers) {
    Object.keys(modifiers).forEach((key) => {
      const modifier = modifiers?.[key];

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
