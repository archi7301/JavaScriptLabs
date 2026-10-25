function* createBatches(items, batchSize) {
    if (!Array.isArray(items)) {
        throw new TypeError('items должен быть массивом');
    }

    if (!Number.isInteger(batchSize) || batchSize <= 0) {
        throw new RangeError('batchSize должен быть положительным целым числом');
    }

    for (let start = 0; start < items.length; start += batchSize) {
        const batch = items.slice(start, start + batchSize);

        yield batch;
    }
}

const users = [
    'Анна',
    'Иван',
    'Мария',
    'Алексей',
    'Ольга',
    'Максим',
    'Елена',
];

const batches = createBatches(users, 3);

console.log(batches.next());
console.log(batches.next());
console.log(batches.next());
console.log(batches.next());