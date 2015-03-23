// Taken from lodash
let compact = (array) => {
  let index = -1,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  while (++index < length) {
    let value = array[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
};
export default compact;
