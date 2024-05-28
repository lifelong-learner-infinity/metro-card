const { getCollections } = require('../models/collection.model');
const { getAllJourneys } = require('../models/passenger.model');
const { STATIONS } = require('../utils/constants');

function handleCollectionSummary() {
    const allCollections = getCollections();
    const allJourneys = getAllJourneys();

    STATIONS.forEach((station) => {
        const collections = allCollections
            .filter(({ collectedAt }) => collectedAt === station)
            .reduce((acc, curr) => {
                const total = acc.total + curr.charges + curr.serviceFees - curr.discount;
                const discount = acc.discount + curr.discount;
                return { total, discount }
            }, { total: 0, discount: 0 });

        const passengerTypeSummary = allJourneys
            .filter(({ source }) => source === station)
            .reduce((acc,{ passengerType }) => {
                acc[passengerType] = (acc[passengerType] || 0) + 1;
                return acc;
            }, {});

        console.log(`TOTAL_COLLECTION ${station} ${collections.total} ${collections.discount}`)
        console.log("PASSENGER_TYPE_SUMMARY");
        Object.entries(passengerTypeSummary)
            .sort(([,a], [,b]) => b - a)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .forEach(([type, count]) => console.log(`${type} ${count}`))
    });
}

module.exports = { handleCollectionSummary }