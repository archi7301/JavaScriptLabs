let nameUser = prompt('Введите вашего лектора: ').trim().toLowerCase(); 
const nameTeacher = "Кудлацкая Марина Викторовна".toLowerCase();

alert(nameTeacher.includes(nameUser) ? "Данные верны" : "Данные неверны");