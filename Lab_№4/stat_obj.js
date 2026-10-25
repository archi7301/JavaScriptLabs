const statistics = {
    education: 12,
    sport: 8,
    entertainment: 15,
};

const categories = Object.keys(statistics);
console.log(categories);

const counts = Object.values(statistics);
console.log(counts);

const categoryInfo = Object.entries(statistics).map(
    ([category, count]) => {
        const name = category === 'education' ? 'обучение' : category;
        return `${name}: ${count}`;
    }
);
console.log(categoryInfo);

const total = Object.values(statistics).reduce(
    (sum, count) => sum + count,
    0
);
console.log(total);

const filteredStatistics = Object.fromEntries(
    Object.entries(statistics).filter(
        ([category, count]) => count > 10
    )
);

console.log(filteredStatistics);