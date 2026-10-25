const daysOfWeek = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    7: 'Воскресенье'
};

let dayNumber = +prompt('Введите номер дня недели (1-7): ');

if (dayNumber >= 1 && dayNumber <= 7) 
{
    alert('Это ' + daysOfWeek[dayNumber]);
}

else 
{
    alert('Неверный номер дня недели');
}

const DaysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресеньe'];
let DayNumber = prompt('Введите номер дня недели (1-7): ');

if (DayNumber >= 1 && DayNumber <= 7) 
{
    alert('Это ' + DaysOfWeek[DayNumber - 1]);
}
 
else 
{
    alert('Неверный номер дня недели');
}