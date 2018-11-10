import { helper } from '@ember/component/helper';

export function indexNumber(params) {
  let index = params[0]+1;
  index = index < 10 ? '0' + index : index;

  return index;
}

export default helper(indexNumber);
