function calculateAverage(...values) {
  if (values.length === 0 || !values.every(value => typeof value === 'number')) 
    return 'Некорректные данные';

  const sum = values.reduce((acc, value) => acc + value, 0);

  return sum / values.length;
}

console.log(calculateAverage(8, 9, 10));
console.log(calculateAverage(5, 7, 8, 10));
console.log(calculateAverage());
console.log(calculateAverage(5, '7', 8));
const grades = [8, 9, 10];
console.log(calculateAverage(...grades));