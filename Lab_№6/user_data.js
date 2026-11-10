const user = {
  id: 17,
  firstName: 'Анна',
  lastName: 'Ковалева',
  email: 'anna@example.com',
  role: 'student',
  isActive: true,
};

const {
  id: userId,
  firstName: name,
  lastName: surname,
  avatar = 'default-avatar.png',
  ...userDetails
} = user;

console.log('Извлеченные данные:');
console.log(userId);
console.log(name);
console.log(surname);
console.log(avatar);
console.log(userDetails);

const admin = {
  ...user,
  role: 'admin',
  permissions: ['read', 'create', 'edit']
};

console.log('\nПроверка объектов:');
console.log('Объект admin:', admin);
console.log('Исходный объект user (не изменился):', user);