module.exports = function check(str, bracketsConfig) {
  var closeBrackets = bracketsConfig.map(val => val[1]),
  openBrackets = bracketsConfig.map(val => val[0]),
  arr = str.split(''),
  index;
  for (var index in bracketsConfig) {
    if (bracketsConfig[index][0] === bracketsConfig[index][1]) {
      var sameBrackets = 0;
      for (var value of arr) {
        if(value === bracketsConfig[index][0]) sameBrackets++;
      }
      if(sameBrackets % 2 != 0) return false;
    }
  }
  if( arr.length % 2 != 0 ) return false;
  do {
    for (index = 0; index < arr.length; ++index) {
      if(closeBrackets.includes(arr[index]) && index > 0) {
        if (!bracketsConfig.some(item => item[0] === arr[index-1] && item[1] === arr[index])) {
          if(!(openBrackets.includes(arr[index]) && closeBrackets.includes(arr[index])))
            return false;
        }
        if (bracketsConfig.some(item => item[0] === arr[index-1] && item[1] === arr[index])) {
          arr.splice(index-1, 2);
          break;
        }
      }
      if (arr.length == 4) {
        if(bracketsConfig.some(item => item[0] === arr[1] && item[1] != arr[2])) {
          return false
        }
      }
      if (arr.length == 2) {
        if (!bracketsConfig.some(item => item[0] === arr[0] && item[1] === arr[1])){
          return false;
        }
      }
    }
  } while( arr && arr.length );
  return true;
}