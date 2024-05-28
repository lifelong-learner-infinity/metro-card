const { getBalance, removeBalance, addBalance } = require('../models/balance.model');
const { addJourney, getPassengerLastJourney } = require('../models/passenger.model');
const { addCollection, getCollections } = require('../models/collection.model');
const { PASSENGER_TYPE, FARE_DISCOUNT, STATIONS, SERVICE_FEES } = require('../utils/constants');

function handlePassengerJourney(cardId, passengerType, sourceStation) {
    // 1. Get balance, passenger fare, destination station and last journey details
    const passengerBalance = getBalance(cardId);
    const passengerFare = PASSENGER_TYPE[passengerType];
    let discount = 0;
    let serviceFees = 0;
    const destinationStation = STATIONS.find((station) => station !== sourceStation);
    let returnJourneyCompleted = false;

    // a. Check if journey is already made. If yes, add discount in collection
    const lastJourney = getPassengerLastJourney(cardId, passengerType);
    if(lastJourney && lastJourney.destination === sourceStation && !lastJourney.returnJourneyCompleted) {
        discount = passengerFare * FARE_DISCOUNT;
        returnJourneyCompleted = true;
    }

    // b. If negative, then add 2% fees at sourceStation
    if(passengerBalance < passengerFare) {
        serviceFees = (passengerFare - passengerBalance - discount) * SERVICE_FEES;
        addBalance(cardId, (passengerFare - passengerBalance - discount));
    }

    removeBalance(cardId, passengerFare - discount);
    addJourney(cardId, sourceStation, destinationStation, passengerType, returnJourneyCompleted);
    addCollection(cardId, passengerFare, discount, serviceFees, sourceStation);
}

module.exports = { handlePassengerJourney };