const events = [
    {
        id: 1,
        title: 'Вечер настольных игр',
        category: 'Развлечения',
        participants: 24,
        isActive: true,
    },
    {
        id: 2,
        title: 'Frontend Meetup',
        category: 'Образование',
        participants: 40,
        isActive: true,
    },
    {
        id: 3,
        title: 'Осенний забег',
        category: 'Спорт',
        participants: 18,
        isActive: false,
    },
];

function findEventById(id) 
{
    return events.find(event => event.id === id);
}

function getActiveEvents() 
{
    return events.filter(event => event.isActive);
}

function getEventsByCategory(category) 
{
    return events.filter(event => event.category === category);
}

function hasEventsWithoutParticipants() 
{
    return events.some(event => event.participants === 0);
}

function sortEventsByParticipants() 
{
    return [...events].sort((a, b) => a.participants - b.participants);
}

function getEventTitles() 
{
    return events.map(event => event.title);
}

function getTotalParticipants() 
{
    return events.reduce((total, event) => total + event.participants, 0);
}


console.log("Поиск события по ID");
console.log(findEventById(2));

console.log("\nАктивные события");
console.log(getActiveEvents());

console.log("\nСобытия категории 'Спорт'");
console.log(getEventsByCategory('Спорт'));

console.log("\nЕсть ли события без участников?");
console.log(hasEventsWithoutParticipants());

console.log("\nСортировка событий по количеству участников по возрастанию");
console.log(sortEventsByParticipants());

console.log("\nСписок всех названий событий");
console.log(getEventTitles());

console.log("\nОбщее количество участников всех событий");
console.log(getTotalParticipants());