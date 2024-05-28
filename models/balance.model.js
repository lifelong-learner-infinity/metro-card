const balance = new Map();

function addBalance(cardId, amount) {
    if(!balance.has(cardId)) {
        balance.set(cardId, +amount);
    } else {
        const currentBalance = balance.get(cardId);
        const updatedBalance = currentBalance + amount;
        balance.set(cardId, updatedBalance);
    }
}

function removeBalance(cardId, amount) {
    if(balance.has(cardId)) {
        const currentBalance = balance.get(cardId);
        const updatedBalance = currentBalance - amount;
        balance.set(cardId, updatedBalance);
    }
}

function getBalance(cardId) {
    if(balance.has(cardId)) {
        return balance.get(cardId);
    }
}

module.exports = { addBalance, removeBalance, getBalance };