import isNil from 'lodash/isNil';
export function enrichObj(obj) {
  let result = {};
  for (let key in obj) {
    if (!isNil(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}
