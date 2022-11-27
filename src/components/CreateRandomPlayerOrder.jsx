import { createRoundMatchups } from './createRoundMatchups';
import { shiftPlayerOrder } from './shiftPlayerOrder';
import { useLocation } from 'react-router-dom';

export const CreateRandomPlayerOrder = () => {

  const location = useLocation();
  const state = location.state;

  const { numberOfPlayers, playEachPlayer } = state;
  const numberOfRounds = playEachPlayer * (numberOfPlayers % 2 === 0 ? numberOfPlayers - 1 : numberOfPlayers);
  // 4 players has 3 rounds to play everyone (AB,CD|AC,BD|AD,BC)
  // 3 players has 3 rounds to play everyone (AB|BC|AC)
  // even number of player = 1 less round than number of players
  // odd number of players = same rounds as number of players

  let teamA = [];
  let teamB = [];

  const orderedPlayerList = [];
  const createPlayerMatchups = () => {
    for (let playerNumber = 0; playerNumber < numberOfPlayers; playerNumber++) {
      orderedPlayerList.push(playerNumber);
    };
  };
  createPlayerMatchups();

  const roundMatchups = createRoundMatchups(numberOfRounds);

  const shuffledPlayers = orderedPlayerList
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  if (teamA.length == 0 && teamB.length == 0) {
    for (let i = 0; i < shuffledPlayers.length; i++) {
      i % 2 == 0 ? teamA.push(shuffledPlayers[i]) : teamB.push(shuffledPlayers[i]);
    }
  }

  for (let roundNumber = 0; roundNumber < numberOfRounds; roundNumber++) {
    for (let matchNumber = 0; matchNumber < teamB.length; matchNumber++) {
      roundMatchups[roundNumber][`Round${roundNumber}`].push([teamA[matchNumber], teamB[matchNumber]]);
    }
    [teamA, teamB] = shiftPlayerOrder(teamA, teamB);
  }
  return roundMatchups;
};