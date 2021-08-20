function deepCopy(data){
  let result;
  if(Array.isArray(data)){
    result = [];
  } else if (typeof data === 'object'){
    result = {}
  } else {
    return data;
  }
  let keys = Object.keys(data)
  for (let i = 0; i<keys.length; i++) {
    let key = keys[i];
    let value = data[key];
    if(Array.isArray(value) || typeof value === 'object'){
      result[key] = deepCopy(value)
    } else {
      result[key] = value
    }
  }
  return result;
}
console.log('deepCopy')
console.log('deepCopy2')
console.log('deepCopy3')