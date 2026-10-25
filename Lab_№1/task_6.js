let russian = +prompt('Введите оценку по русскому: ');
let math = +prompt('Введите оценку по математике: ');
let english = +prompt('Введите оценку по английскому: ');

if (russian >= 4 && math >= 4 && english >= 4) {
    alert('Ты переведён на след.курс');
}

else if (russian < 4 && math < 4 && english < 4) {
    alert('Ты отчислен');
}

else if (russian < 4 || math < 4 || english < 4) {
    alert('Пересдача!');
}