// Исходный объект пользователя
const user = {
  id: 17,
  firstName: 'Анна',
  lastName: 'Ковалева',
  email: 'anna@example.com',
  role: 'student',
  isActive: true,
};

// 1. Деструктуризация объекта по условиям задачи
const {
  id: userId,
  firstName: name,
  lastName: surname,
  avatar = 'default-avatar.png',
  ...userDetails
} = user;

// Проверка извлеченных переменных
console.log('Извлеченные данные:');
console.log(userId);   // 17
console.log(name);     // Анна
console.log(surname);  // Ковалева
console.log(avatar);   // default-avatar.png
console.log(userDetails); // { email: 'anna@example.com', role: 'student', isActive: true }

// 2. Создание нового объекта admin без изменения исходного user
const admin = {
  ...user,
  role: 'admin',
  permissions: ['read', 'create', 'edit']
};

// 3. Проверка содержимого объектов
console.log('\nПроверка объектов:');
console.log('Объект admin:', admin);
console.log('Исходный объект user (не изменился):', user);
