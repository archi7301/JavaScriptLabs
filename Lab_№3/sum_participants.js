function sumParticipants(arr) 
{
    return arr.reduce((total, curr) => 
    {
        if (Array.isArray(curr)) 
        {
            return total + sumParticipants(curr);
        }
        return total + curr;
    }, 0);
}

const participants = [
  12,
,
  [3, [7, 10]],
  [],
];

console.log(sumParticipants(participants));