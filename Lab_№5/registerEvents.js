function createRegistrationHandler(eventId, callback) {
    return function (event) {
        callback(eventId, event);
    };
}

function registerForEvent(eventId, event) {
    console.log(`Регистрация на мероприятие ${eventId}`);

    console.log('Тип события:', event?.type);
}

const handleFirstEvent = createRegistrationHandler(
    101,
    registerForEvent
);

const handleSecondEvent = createRegistrationHandler(
    205,
    registerForEvent
);

handleFirstEvent();
handleSecondEvent();