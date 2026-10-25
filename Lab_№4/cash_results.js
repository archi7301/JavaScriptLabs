const cache = new WeakMap();

function getEventStatistics(event) {
    if (cache.has(event)) {
        console.log('Результат получен из кеша');
        return cache.get(event);
    }

    console.log('Выполняется расчёт..');

    const result = {
        availablePlaces: event.capacity - event.participants,
        occupancyPercent: (event.participants / event.capacity) * 100,
    };

    cache.set(event, result);

    return result;
}


const event = {
    title: 'Work Meeting',
    capacity: 40,
    participants: 24,
};

console.log(getEventStatistics(event));
console.log(getEventStatistics(event));
console.log(getEventStatistics({ ...event }));