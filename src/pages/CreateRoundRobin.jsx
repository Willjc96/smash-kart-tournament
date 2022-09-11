import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function CreateRoundRobin() {
  const location = useLocation();
  const state = location.state;
  // const state = {
  //   tournamentTitle: "Mario Kart Tournament",
  //   numberOfPlayers: 8,
  //   selectedGame: "marioKart8",
  //   playerNames: [
  //     { playerNumber: 0, playerName: 'P1' },
  //     { playerNumber: 1, playerName: 'P2' },
  //     { playerNumber: 2, playerName: 'P3' }
  //   ],
  //   playEachPlayer: 1
  // };
  const { tournamentTitle, numberOfPlayers, playerNames, selectedGame, playEachPlayer } = state;

  const numberOfRounds = playEachPlayer * (numberOfPlayers % 2 === 0 ? numberOfPlayers - 1 : numberOfPlayers);
  // 4 players has 3 rounds to play everyone (AB,CD|AC,BD|AD,BC)
  // 3 players has 3 rounds to play everyone (AB|BC|AC)
  // even number of player = 1 less round than number of players
  // odd number of players = same rounds as number of players

  const numberOfRoundsArray = [];
  const createListOfRounds = () => {
    for (let i = 0; i < numberOfRounds; i++) {
      numberOfRoundsArray.push(
        <h2>Round {i + 1}</h2>
      );
    };
  };
  createListOfRounds();


  return (
    <>
      <div className='title'>
        <h1>{tournamentTitle}</h1>
        <h2>Round Robin</h2>
        <h2>{numberOfRounds}</h2>
      </div>

      <div className='rounds'>
        {numberOfRoundsArray.map((round) => {
          return (
            <div>
              <h3>
                {round}
              </h3>
            </div>
          );
        })}
      </div>




      <h1>{numberOfPlayers}</h1>
      {playerNames.map((player) => {
        return <h2>{player.playerName}</h2>;
      })}

      <Link to='/'>
        <button>
          Click me
        </button>
      </Link>
    </>
  );
}

export default CreateRoundRobin;