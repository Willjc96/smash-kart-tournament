import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function CreateKnockout() {
  const location = useLocation();
  // const state = location.state;
  const state = {
    tournamentTitle: "Mario Kart Tournament",
    numberOfPlayers: 8,
    eliminationType: "singleElimination",
    selectedGame: "marioKart8",
    playerNames: [
      { playerNumber: 0, playerName: 'P1' },
      { playerNumber: 1, playerName: 'P2' },
      { playerNumber: 2, playerName: 'P3' }
    ]
  };
  const { tournamentTitle, numberOfPlayers, playerNames, selectedGame, eliminationType } = state;

  return (
    <>
      <div className='title'>
        <h1>{tournamentTitle}</h1>
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

export default CreateKnockout;