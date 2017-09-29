
function multiply(first, second) {
  first = first.split('').reverse();
  second = second.split('').reverse();

  let length = first.length + second.length + 1;
  let c = (new Array(length)).fill(0);
  let firstNumber = 0;
  
 for (let ix = 0; ix < first.length; ix++) {
  for (let jx = 0; jx < second.length; jx++) {
    let index = ix + jx - 1;

    index < 0
      ? firstNumber = parseInt(first[ix] * second[jx]) 
      : c[index] += parseInt(first[ix] * second[jx]);
  }
 }

 c.unshift(firstNumber);

 for (let ix = 0; ix < length; ix++) {
  c[ix + 1] +=  parseInt(c[ix] / 10);
  c[ix] = parseInt(c[ix] % 10);
 }
  
 while (length && !c[length]) {
  length--;
 }

 return c.slice(0, length + 1).reverse().join('');
}

module.exports = function zeros(expression) {
  let array = [];
  let count = 0;
  let sum = [];
  if(expression.indexOf("*", 0) === -1) {
    array = expression.split('!');

    for(let i = 0; i < array[0]; i++) {
      if (i % 5 === 0) {
        count++
      }
    }

    return count;
  }
  else {
    array = expression.split('*');

    let values = [];

    for (let exprIndex = 0; exprIndex < array.length; exprIndex++) {
      let splittedValues = array[exprIndex].split('!');

      isDouble = splittedValues.length === 3;

      let value = 1;

      for (let i = 1; i <= splittedValues[0]; i++) {
        if (isDouble) {
          if ((splittedValues[0] % 2 === 0 && i % 2 === 0) || (splittedValues[0] % 2 !== 0 && i % 2 !== 0)) {
            value = multiply(value.toString(), i.toString());
          }
        } else {
          value = multiply(value.toString(), i.toString());
        }
      }

      values.push(value);
    }

    let result = 1;
    values.forEach(value => result = multiply(result.toString(), value.toString()));

    let count = 0;
    let length = result.length - 1;

    while (length && result[length] === '0') {
      length--;
      count++;
    }

    return count;
  }
}