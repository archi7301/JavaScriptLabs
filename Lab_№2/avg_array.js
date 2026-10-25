function getAverage(arr)
{
    if (arr.length === 0) return 0;

    const sum = arr.reduce((acc, num) => acc + num, 0);
    return sum / arr.length;
}

console.log(getAverage([1, 2, 3, 4, 5]));