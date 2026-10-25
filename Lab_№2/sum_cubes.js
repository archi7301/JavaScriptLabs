function sumCubes(n)
{
    const sum = (n * (n + 1)) / 2;
    return Math.pow(sum, 2);
}

console.log(sumCubes(3))