function countSquares(rectWidth, rectHeight, squareSize) {
    const countX = Math.floor(rectWidth / squareSize);
    const countY = Math.floor(rectHeight / squareSize);
    
    return countX * countY;
}

const rectWidth = 45;
const rectHeight = 21;
const squareSize = 5;

const totalSquares = countSquares(rectWidth, rectHeight, squareSize);
console.log(`\nВ прямоугольник поместится: ${totalSquares} квадратов.`);