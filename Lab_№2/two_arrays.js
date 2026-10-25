function diffArrays(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

const arr1 = ["яблоко", "банан", "груша", "киви"];
const arr2 = ["банан", "киви"];

const arr3 = diffArrays(arr1, arr2);
console.log(arr3);
