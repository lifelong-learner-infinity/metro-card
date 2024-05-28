const { addBalance } = require('../models/balance.model');


function handleAddBalance(cardId, amount) {
    addBalance(cardId, amount);
}

module.exports = { handleAddBalance };