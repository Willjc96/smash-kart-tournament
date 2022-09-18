export const shiftPlayerOrder = (teamA, teamB) => {
  const newTeamA = teamA;
  const newTeamB = teamB;
  const poppedValue = newTeamA.pop();
  newTeamB.push(poppedValue);
  const shiftedValue = newTeamB.shift();
  newTeamA.splice(1, 0, shiftedValue);
  teamA = newTeamA;
  teamB = newTeamB;
  return [teamA, teamB];
};