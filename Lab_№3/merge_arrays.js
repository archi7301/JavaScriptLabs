const firstSchedule = [
  [101, 102],
  [103],
  [104, 105],
];

const secondSchedule = [
  [201],
  [202, 203],
];


function mergeEventIds(firstSchedule, secondSchedule) {
  const combined = [...firstSchedule, ...secondSchedule];
  
  const result = combined.reduce((acc, currArr) => {
    return acc.concat(currArr);
  }, []);
  
  return result;
}

console.log(mergeEventIds(firstSchedule, secondSchedule))