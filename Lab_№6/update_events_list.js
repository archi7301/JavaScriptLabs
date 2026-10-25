
const events = [
  {
    id: 1,
    title: 'JavaScript Meetup',
    category: 'education',
    participants: 35,
  },
  {
    id: 2,
    title: 'University Run',
    category: 'sport',
    participants: 48,
  },
];

const newEvent = {
  id: 3,
  title: 'Design Workshop',
  category: 'education',
  participants: 20,
};

const eventsWithNewEvent = [...events, newEvent];

function updateEvent(events, eventId, changes) {
  return events.map(event => event.id === eventId ? { ...event, ...changes } : event);
}

const updatedEvents = updateEvent(
  eventsWithNewEvent,
  2,
  {
    title: 'Autumn University Run',
    participants: 55,
  }
);

console.log(updatedEvents);