function basicOperation(operation, value1, value2) 
{
  switch (operation) {
    case '+':
      return value1 + value2;

    case '-':
      return value1 - value2;

    case '*':
      return value1 * value2;

    case '/':
      if (value2 === 0) return 'Ошибка: деление на ноль';
      return value1 / value2;

    default:
      return 'Ошибка: неизвестный оператор';
  }
}

console.log(basicOperation('+', 5, 10));
console.log(basicOperation('-', 20, 5));
console.log(basicOperation('*', 3, 5));
console.log(basicOperation('/', 30, 2));