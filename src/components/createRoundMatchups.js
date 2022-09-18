export const createRoundMatchups = (numberOfRounds) => {
  const roundMatchups = [];
  for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
    roundMatchups.push(
      { [`Round${roundNumber}`]: [] }
    );
  };
  return roundMatchups;
};