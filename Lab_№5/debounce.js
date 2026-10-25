function debounce(callback, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => { callback(...args); }, delay);
    };
}

function searchEvents(query) {
    console.log(`Выполняется поиск: ${query}`);
}

const handleSearch = debounce(searchEvents, 500);
handleSearch('j');
handleSearch('ja');
handleSearch('javascript');


if (typeof document !== 'undefined') {
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('input', (event) => { handleSearch(event.target.value); });
}