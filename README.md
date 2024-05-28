# Metro Card Balance Calculator

## Context
A new metro train has been launched from the Central station to the Airport. It is a non-stop train, which means the train will stop only at the Airport with no intermediate stops.
It is also possible to return from the Airport back to the Central station. This is also a non-stop journey.

## MetroCard
Metro authority prefers money to be collected via MetroCard. MetroCard is an electronic payment utility that can be used to pay for the metro travel charges. The MetroCard is like a wallet loaded with money. Each person traveling in this metro must carry a MetroCard and each card will have a unique number.

To travel by this train, one needs a MetroCard. If the MetroCard doesn’t have sufficient balance, then the remaining cost for the travel needs to be paid by recharging the MetroCard. This auto recharge loads only the required amount of money for the journey and the station collects a 2% service fee for the transaction.

## Travel charges
Costs for the journey are based on the passenger's age. It is categorized as below
* Adult - 2000
* Senior Citizen - 100
* Kids - 50

## Journey Types
Travel charges are different for a single trip and for a return journey. When a passenger takes a return journey, there is a discount of 50% for the travel charges of the return journey.

For eg: If a senior citizen travels from Central to Airport, the travel charge collected is 100. If the same citizen travels back to Central station,  the amount collected for the return journey is 50. If the same citizen passes a third time on the same day, it will be treated as a new single journey and the travel charge collected is 100.


## Assumptions
* All passengers should have a MetroCard.
* If a passenger does not have sufficient balance in the MetroCard, then the MetroCard needs to be recharged before taking up the journey.
* The service fee for doing the recharge is collected by the origin station of the journey.
* The passenger count is calculated based on journeys eg: if the same passenger travels twice, the count is 2.