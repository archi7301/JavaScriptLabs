const events = [
  { title: 'Frontend Meetup', category: 'education', participants: 45, capacity: 60 },
  { title: 'Campus Run', category: 'sport', participants: 30, capacity: 30 },
  { title: 'JavaScript Workshop', category: 'education', participants: 18, capacity: 25 },
  { title: 'Music Evening', category: 'culture', participants: 70, capacity: 100 },
];

function groupAvailableEvents(events) 
{
  return events
    .filter(event => event.participants < event.capacity)
    .reduce((acc, event) => 
    {
      const category = event.category;
      
      if (!acc[category])
        acc[category] = [];

      acc[category].push(event);

      return acc;
    }, {});
}

const result = groupAvailableEvents(events);
console.log(result);