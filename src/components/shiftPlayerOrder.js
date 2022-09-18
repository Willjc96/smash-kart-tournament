export const shiftPlayerOrder = (teamA, teamB) => {
  const isEvenNumberOfPlayers = (teamA.length + teamB.length) % 2 == 0;
  const newTeamA = teamA;
  const newTeamB = teamB;
  const poppedValue = newTeamA.pop();
  newTeamB.push(poppedValue);
  const shiftedValue = newTeamB.shift();
  isEvenNumberOfPlayers
    ? newTeamA.splice(1, 0, shiftedValue)
    : newTeamA.unshift(shiftedValue);
  teamA = newTeamA;
  teamB = newTeamB;
  return [teamA, teamB];
};
  // if even number of players then first player needs to remain in same position to face all players
  // A = [1,2]  A = [1,3]
  // B = [3,4]  B = [4,2]
  // if odd number of players then all players can rotate as there will be a different player not paired each time
  // A = [1,2,3]  A = [4,1,2]
  // B = [4,5]    B = [5,3]