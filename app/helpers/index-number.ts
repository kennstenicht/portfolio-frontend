import { helper } from '@ember/component/helper';

export function indexNumber([value]: [number]): string {
  const index = (value + 1).toString();
  let prefix = '';

  if (value < 9) {
    prefix = '0';
  }

  return `${prefix}${index}`;
}

export default helper(indexNumber);
