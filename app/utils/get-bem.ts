import config from 'portfolio/config/environment';

type CSSModuleClasses = Record<string, string>;

interface Modifier {
  [key: string]: string | boolean | string[] | null | undefined;
}

export function getBem(
  blocks: CSSModuleClasses | Array<CSSModuleClasses | null | undefined | false>,
) {
  const list = Array.isArray(blocks) ? blocks : [blocks];
  const normalizedBlocks = list.filter((block): block is CSSModuleClasses =>
    Boolean(block),
  );

  const bem = (element?: string | Modifier, modifier?: Modifier) => {
    // Shift the arguments, if we dont have an element but modifier
    if (typeof element === 'object') {
      modifier = element;
      element = undefined;
    }

    let classes: Array<string | undefined> = [];
    for (const block of normalizedBlocks) {
      classes.push(...generateFromModule(block, element, modifier));
    }

    classes = classes.filter(Boolean);

    if (classes.length === 0) {
      return '';
    }

    return classes.join(' ');
  };

  return bem;
}

function generateFromModule(
  block: CSSModuleClasses,
  element?: string,
  modifier?: Modifier,
) {
  const baseClass = element ?? 'scope';
  const modifierClasses = generateModifier(baseClass, modifier);
  const classes = [baseClass, ...modifierClasses];

  return classes.map((className) => {
    const resolved = block[className];

    if (!resolved && config.environment === 'development') {
      console.warn(`[bem] class "${className}" not found in CSS module`);
    }

    return resolved;
  });
}

function generateModifier(baseClass: string, modifier?: Modifier) {
  if (!modifier) {
    return [];
  }

  const classes: string[] = [];

  for (const key of Object.keys(modifier)) {
    const modifierValue = modifier[key];

    if (!modifierValue) {
      continue;
    }

    if (typeof modifierValue === 'boolean') {
      classes.push(`${baseClass}--${key}`);
    } else if (Array.isArray(modifierValue)) {
      for (const value of modifierValue) {
        classes.push(`${baseClass}--${key}-${value}`);
      }
    } else {
      classes.push(`${baseClass}--${key}-${modifierValue}`);
    }
  }

  return classes;
}
