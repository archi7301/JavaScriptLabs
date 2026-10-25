const coordinates = [53.902284, 27.561831, 215];

const [latitude, longitude, altitude = 0] = coordinates;

console.log(latitude);
console.log(longitude);
console.log(altitude);

function showLocation(latitude, longitude, altitude) 
{
  console.log(`Координаты: ${latitude}, ${longitude}. Высота: ${altitude} м.`);
}

showLocation(...coordinates);