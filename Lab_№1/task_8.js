let userNumber = +prompt('Введите число от 1 до 10: ');

if (userNumber >= 1 && userNumber <= 10) 
{
   alert((userNumber % 2 == 0) ? userNumber + 2 : userNumber + 'мм');
}

else 
{
    alert('Число не входит в диапазон от 1 до 10');
}