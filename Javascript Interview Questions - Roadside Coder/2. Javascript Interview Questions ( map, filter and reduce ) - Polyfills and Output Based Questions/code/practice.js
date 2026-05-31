// Using Map -  to multiply each element of the array by 2
/*
array = [1, 2, 3, 4, 5];
multiplyByTwo = array.map((num, index, array) => {
    return num * 2;
})
console.log(`Original Array: ${array}`);
console.log(`After Map: ${multiplyByTwo}`);
*/

/*
// Using Filter - to filter out the even numbers from the array
array = [1, 2, 3, 4, 5, 6];
evenNumbers = array.filter((num, index, array) => {
    return num % 2 == 0;
})
console.log(`Original Array: ${array}`);
console.log(`After Filter: ${evenNumbers}`);
*/

/*
// Using Reduce - to find the sum of all the elements in the array
array = [1, 2, 3, 4, 5];
sum = array.reduce((accumulator, currentValue, index, array) => {
    return accumulator + currentValue;
}, 0)
console.log(`Original Array: ${array}`);
console.log(`After Reduce: ${sum}`);
*/

/*
// Polyfills : Writing from scratch the functionality of map, filter and reduce

// Polyfill for Map
Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

//  check if the above polyfill works
array = [1, 2, 3, 4, 5];
multiplyByTwo = array.myMap((num, index, array) => {
  return num * 2;
});
console.log(`Original Array: ${array}`);
console.log(`After myMap: ${multiplyByTwo}`);

*/

/*
// Polyfill for filter
Array.prototype.myFilter = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

// Usage
const nums = [1, 2, 3, 4];
const result = nums.myFilter((num) => num > 2);
console.log(result); // [3, 4]
*/

// Polyfills for reduce

Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callback(accumulator, this[i], i, this);
    } else {
      // No initial value: use first element as accumulator
      accumulator = this[i];
    }
  }
  return accumulator;
};

// Usage
const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10