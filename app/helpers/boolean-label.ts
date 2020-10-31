import { helper } from '@ember/component/helper';

export function booleanLabel(params: [boolean, string, string]) {
  return params[0] ? params[1] : params[2];
}

export default helper(booleanLabel);
