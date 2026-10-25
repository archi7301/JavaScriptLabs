const registrations = new Map();

registrations.set(1, {
    title: 'Вечер настольных игр',
    participants: 2,
    price: 10,
});

function addRegistration(id, title, participants, price) {
    if (registrations.has(id))
    {
        registrations.get(id).participants += participants;
    }

    else
    {
        registrations.set(id, {
            title: title,
            participants: participants,
            price: price
        })
    }
}

function hasRegistration(id) 
{
    return registrations.has(id);
}

function removeRegistration(id) 
{
    registrations.delete(id);
}

function changeParticipants(id, participants) 
{
    const registration = registrations.get(id);

    if (registration)
        registration.participants = participants;
}

function changePrice(id, price) 
{
    const registration = registrations.get(id);

    if (registration)
        registration.price = price;
}

function getRegistrationsCount() 
{
    return registrations.size;
}

function getTotalTickets() 
{
    let total = 0;

    for (const registration of registrations.values())
        total += registration.participants;

    return total;
}

function getTotalPrice() {
    let total = 0;

    for (const registration of registrations.values()) {
        total += registration.participants * registration.price;
    }

    return total;
}