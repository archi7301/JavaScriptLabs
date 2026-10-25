function params(a, b) {
    if (a === b) {
        console.log("Периметр квадрата: " + (4 * a));
    } else {
        console.log("Площадь прямоугольника: " + (a * b));
    }
}

params(5, 5);


const parms = function(a, b) {
    if (a === b) {
        console.log("Периметр квадрата: " + (4 * a));
    } else {
        console.log("Площадь прямоугольника: " + (a * b));
    }
};

parms(5, 10);


const parm = (a, b) => {
    console.log(a === b ? "Периметр квадрата: " + (4 * a) : "Площадь прямоугольника: " + (a * b));
};

parm(4, 4);
