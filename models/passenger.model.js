const journeys = [];

let id = 1;

function addJourney(cardId, source, destination, passengerType, returnJourneyCompleted) {
    journeys.push({ id, cardId, source, destination, passengerType, returnJourneyCompleted });
    id++;
}

function getPassengerLastJourney(cardId, passengerType) {
    const filteredJourney = journeys.filter((journey) => journey.cardId === cardId && journey.passengerType === passengerType);
    return filteredJourney[filteredJourney.length - 1];
}

function getAllJourneys() {
    return journeys;
}

module.exports = { addJourney, getPassengerLastJourney, getAllJourneys };