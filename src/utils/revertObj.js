import forEach from 'lodash/forEach';
export default function revertObj(obj) {
  let result = {};
  forEach(obj, (value, key) => {
    result[value] = key;
  });
  return result;
}
