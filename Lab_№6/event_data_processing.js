const event = {
  id: 101,
  title: 'Frontend Meetup',
  category: 'education',
  location: {
    building: {
      name: 'Главный корпус',
      address: {
        city: 'Минск',
        street: 'ул. Свердлова',
        buildingNumber: '13а',
      },
    },
    room: {
      number: '305',
      floor: 3,
    },
  },
  schedule: {
    date: '2026-10-15',
    time: {
      start: '18:00',
      end: '20:30',
    },
  },
  organizer: {
    profile: {
      firstName: 'Мария',
      lastName: 'Соколова',
      contacts: {
        email: 'maria@example.com',
        phone: '+375291234567',
      },
    },
  },
  participants: [
    { id: 1, name: 'Анна', status: 'confirmed' },
    { id: 2, name: 'Иван', status: 'waiting' },
    { id: 3, name: 'Ольга', status: 'confirmed' },
  ],
};

// 1. Вложенная деструктуризация объекта
const {
  id,
  title,
  location: {
    building: {
      name: buildingName,
      address: { city, street, buildingNumber }
    },
    room: { number: roomNumber, floor }
  },
  schedule: {
    date,
    time: { start, end }
  },
  organizer: {
    profile: {
      firstName,
      lastName,
      contacts: { email }
    }
  },
  participants
} = event;

// Вспомогательное преобразование даты из '2026-10-15' в '15.10.2026'
const formattedDate = date.split('-').reverse().join('.');

// 2. Формирование и вывод итоговой строки
const infoString = `${title} пройдёт ${formattedDate} с ${start} до ${end} по адресу: 
${city}, ${street}, ${buildingNumber}, ${buildingName}, 
аудитория ${roomNumber}. Организатор: ${firstName} ${lastName}.`;

console.log(infoString);

// 3. Фильтрация и маппинг участников с деструктуризацией в параметрах функций
const confirmedParticipants = participants
  .filter(({ status }) => status === 'confirmed')
  .map(({ name }) => name);

console.log('\nСписок подтвержденных участников:');
console.log(confirmedParticipants); // [ 'Анна', 'Ольга' ]
