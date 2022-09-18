import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { createRoundMatchups } from '../components/createRoundMatchups';
import { getMatchCard } from '../components/getMatchCard';
import { shiftPlayerOrder } from '../components/shiftPlayerOrder';

function CreateRoundRobin() {
  let teamA = [];
  let teamB = [];

  const location = useLocation();
  const state = location.state;

  const { tournamentTitle, numberOfPlayers, playerNames, selectedGame, selectedGameLabel, playEachPlayer } = state;

  const numberOfRounds = playEachPlayer * (numberOfPlayers % 2 === 0 ? numberOfPlayers - 1 : numberOfPlayers);
  // 4 players has 3 rounds to play everyone (AB,CD|AC,BD|AD,BC)
  // 3 players has 3 rounds to play everyone (AB|BC|AC)
  // even number of player = 1 less round than number of players
  // odd number of players = same rounds as number of players

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

  const findPlayer = ({ playerNames, match }, index) => {
    return playerNames.filter((player) => {
      return player.playerNumber == match[index];
    })[0];
  };

  return (
    <>
      <div className='title'>
        <h1>{tournamentTitle || 'No Title Available'}</h1>
        <h2>{selectedGameLabel} - Round Robin</h2>
      </div>

      <div className='rounds'>
        {roundMatchups.map((round, index) => {
          const matchRounds = round[`Round${[index]}`];
          return (
            <div className='round'>
              <h3>
                Round {index + 1}
              </h3>
              <div className='round-matches'>
                {matchRounds.map((match, index) => {
                  const firstPlayerMatchup = findPlayer({ playerNames, match }, 0);
                  const secondPlayerMatchup = findPlayer({ playerNames, match }, 1);
                  return (
                    getMatchCard(index, firstPlayerMatchup, secondPlayerMatchup)
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Link to='/'>
        <button>
          Click me
        </button>
      </Link>
    </>
  );
}

export default CreateRoundRobin;;