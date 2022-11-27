import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CreateRandomPlayerOrder } from '../components/CreateRandomPlayerOrder';
import { DisplayRandomPlayerOrder } from '../components/DisplayRandomPlayerOrder';

function CreateRoundRobin() {

  const location = useLocation();
  const state = location.state;

  const { tournamentTitle, playerNames, selectedGameLabel } = state;

  const randomPlayerOrder = CreateRandomPlayerOrder();
  return (
    <>
      <div className='title'>
        <h1>{tournamentTitle || 'No Title Available'}</h1>
        <h2>{selectedGameLabel} - Round Robin</h2>
      </div>

      <div className='rounds'>
        <DisplayRandomPlayerOrder randomPlayerOrder={randomPlayerOrder} playerNames={playerNames} selectedGameLabel={selectedGameLabel} key={'listOfRounds'} />
      </div>

      <Link to='/'>
        <button>
          Restart
        </button>
      </Link>
    </>
  );
}

export default CreateRoundRobin;;