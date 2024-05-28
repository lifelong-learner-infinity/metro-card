const collections = [];
let id = 1;

function addCollection(cardId, charges, discount, serviceFees, collectedAt) {
    collections.push({ id, cardId, charges, discount, serviceFees, collectedAt });
    id++;
}

function getCollections() {
    return collections;
}

module.exports = { addCollection, getCollections };
