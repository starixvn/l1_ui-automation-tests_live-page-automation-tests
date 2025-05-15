export const sedieConfig = {
    gameId: 2,
    minBet: 10,
    maxBet: 1000,
    choices: ["odd", "even", "red2", "red3", "red4", "white3", "white4"],
    odds: {
        even: 1.96,
        odd: 1.96,
        red2: 2.4,
        red3: 3.75,
        red4: 14.4,
        white3: 3.75,
        white4: 14.4,
    },
    expectedOdds: 'Lẻ1.96Chẵn1.9614.403.752.4014.403.75',
    hedgeBetGroups: [["even", "odd"]],

};

export default sedieConfig
    
  