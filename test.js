const assert = require('assert');
const { addBalance, getBalance, removeBalance} = require('./models/balance.model');
const { getAllJourneys, getPassengerLastJourney, addJourney } = require('./models/passenger.model');

describe('Balance Model', () => {
    describe('addBalance Function', () => {
        it("Should add balance to new metro card", () => {
            const card = "MC1";
            addBalance(card, 100);
            assert.strictEqual(getBalance(card), 100);
        });

        it("Should add balance to existing metro card", () => {
            const card = "MC2";
            addBalance(card, 100);
            addBalance(card, 500);
            assert.strictEqual(getBalance(card), 600);
        });
    });

    describe('removeBalance Function', () => {
        it("Should remove balance to existing metro card", () => {
            const card = "MC3";
            addBalance(card, 500);
            removeBalance(card, 200);
            assert.strictEqual(getBalance(card), 300);
        });

        it("Should do nothing if card does not exist", () => {
            removeBalance('otherCard', 100);
            assert.strictEqual(getBalance('otherCard'), undefined);
        });
    });

    describe('getBalance Function', () => {
        it("Should return undefined for non-existing metro card", () => {
            assert.strictEqual(getBalance('nonExistingCard'), undefined);
        });

        it("Should return balance for existing card", () => {
            addBalance('card', 100);
            assert.strictEqual(getBalance('card'), 100);
        });
    });
});

describe('Passenger Model', () => {
    describe('addJourney Function', function() {
        it('should add a journey to the journeys array', function() {
            addJourney('card1', 'Source1', 'Destination1', 'adult', true);
            assert.strictEqual(getAllJourneys().length, 1);
        });

        it('should increment id for each new journey', function() {
            addJourney('card1', 'Source1', 'Destination1', 'adult', true);
            addJourney('card2', 'Source2', 'Destination2', 'child', false);
            const allJourneys = getAllJourneys();
            assert.strictEqual(allJourneys[1].id, 2);
            assert.strictEqual(allJourneys[2].id, 3);
        });
    });

    describe('getPassengerLastJourney Function', function() {
        it('should return the last journey for a specific cardId and passengerType', function() {
            addJourney('card1', 'Source1', 'Destination1', 'adult', true);
            addJourney('card1', 'Source2', 'Destination2', 'child', false);
            const lastJourney = getPassengerLastJourney('card1', 'child');
            assert.deepStrictEqual(lastJourney, { id: 5, cardId: 'card1', source: 'Source2', destination: 'Destination2', passengerType: 'child', returnJourneyCompleted: false });
        });

        it('should return undefined if no journey found for given cardId and passengerType', function() {
            const lastJourney = getPassengerLastJourney('nonExistingCard', 'child');
            assert.strictEqual(lastJourney, undefined);
        });
    });

    describe('getAllJourneys Function', function() {
        it('should return all journeys', function() {
            addJourney('card1', 'Source1', 'Destination1', 'adult', true);
            addJourney('card2', 'Source2', 'Destination2', 'child', false);
            const allJourneys = getAllJourneys();
            assert.deepStrictEqual(allJourneys, [
                { id: 1, cardId: 'card1', source: 'Source1', destination: 'Destination1', passengerType: 'adult', returnJourneyCompleted: true },
                { id: 2, cardId: 'card1', source: 'Source1', destination: 'Destination1', passengerType: 'adult', returnJourneyCompleted: true },
                { id: 3, cardId: 'card2', source: 'Source2', destination: 'Destination2', passengerType: 'child', returnJourneyCompleted: false },
                { id: 4, cardId: 'card1', source: 'Source1', destination: 'Destination1', passengerType: 'adult', returnJourneyCompleted: true },
                { id: 5, cardId: 'card1', source: 'Source2', destination: 'Destination2', passengerType: 'child', returnJourneyCompleted: false },
                { id: 6, cardId: 'card1', source: 'Source1', destination: 'Destination1', passengerType: 'adult', returnJourneyCompleted: true },
                { id: 7, cardId: 'card2', source: 'Source2', destination: 'Destination2', passengerType: 'child', returnJourneyCompleted: false }
            ]);
        });
    });
})