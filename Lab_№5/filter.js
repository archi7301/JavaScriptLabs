function filterBy(property) {
    return function (value) {
        return function (items) {
            return items.filter(item => {
                return item[property] === value;
            });
        };
    };
}

const events = [
  { id: 1, title: 'JavaScript Meetup', category: 'education', isActive: true },
  { id: 2, title: 'University Run', category: 'sport', isActive: false },
  { id: 3, title: 'React Workshop', category: 'education', isActive: true },
];

const filterByCategory = filterBy('category');
const filterEducationEvents = filterByCategory('education');

console.log(filterEducationEvents(events));