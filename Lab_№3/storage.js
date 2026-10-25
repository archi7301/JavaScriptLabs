function createStorageBar(used, limit, length) {
    if (
        typeof used !== 'number' ||
        typeof limit !== 'number' ||
        typeof length !== 'number' ||
        used < 0 ||
        limit <= 0 ||
        used > limit ||
        !Number.isInteger(length) ||
        length <= 0
    ) {
        return 'Некорректные данные';
    }

    const filledLength = Math.round((used / limit) * length);
    const emptyLength = length - filledLength;

    return '#'.repeat(filledLength) + '-'.repeat(emptyLength);
}


function createStorageReport(storages, length) {
    return storages.map(storage => {
        const { user, used, limit } = storage;

        const bar = createStorageBar(used, limit, length);

        if (bar === 'Некорректные данные') {
            return `${user}: Некорректные данные`;
        }

        const percent = Math.round((used / limit) * 100);

        return `${user}: ${bar} ${percent}%`;
    });
}


const storages = [
    {
        user: 'Анна',
        used: 45,
        limit: 60,
    },
    {
        user: 'Максим',
        used: 100,
        limit: 100,
    },
];

console.log(createStorageReport(storages, 10));