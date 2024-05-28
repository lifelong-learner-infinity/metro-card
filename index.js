const fs = require('fs');
const readline = require('readline');

const { handleAddBalance } = require('./controller/balance.controller');
const { handlePassengerJourney } = require('./controller/passenger.controller');
const { handleCollectionSummary } = require('./controller/collection.controller');
const { ACTIONS } = require('./utils/constants');

const filePath = process.argv[2];

try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream
    });

    rl.on('line', (data) => {
        const [action, cardId, ...otherInfo] = data.split(" ");

        switch (action) {
            case ACTIONS.BALANCE:
                handleAddBalance(cardId, ...otherInfo);
                break;
            case ACTIONS.CHECK_IN:
                handlePassengerJourney(cardId, ...otherInfo);
                break;
            case ACTIONS.PRINT_SUMMARY:
                handleCollectionSummary();
                break;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    });

} catch (error) {
    console.log(error);
}
