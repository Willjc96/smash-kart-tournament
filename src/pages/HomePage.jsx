import { SearchOutlined } from '@ant-design/icons';
import { Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarioKart8Icon from '../icons/MarioKart8Icon.png';
import SmashBrosIcon from '../icons/SSBU_Smash_Ball_Icon.png';
import ChessIcon from '../icons/ChessIcon.png';
import EllipsisIcon from '../icons/EllipsisIcon.png';
import { getPlayerAvatar } from '../components/getPlayerAvatar';

function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tournamentTitle, setTournamentTitle] = useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [eliminationType, setEliminationType] = useState('singleElimination');
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedGameLabel, setSelectedGameLabel] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);
  const [tournamentType, setTournamentType] = useState(null);
  const [playEachPlayer, setPlayEachPlayer] = useState(1);

  const navigate = useNavigate();

  const listOfGames = [
    { label: 'Mario Kart 8', value: 'marioKart8', icon: MarioKart8Icon },
    { label: 'Super Smash Bros.', value: 'superSmashBros', icon: SmashBrosIcon },
    { label: 'Chess', value: 'chess', icon: ChessIcon },
    { label: 'Other', value: 'other', icon: EllipsisIcon }
  ];

  const showModal = (showModal, tournamentType) => {
    setIsModalVisible(showModal);
    setTournamentType(tournamentType);
  };

  const handlePlayerNames = (value, index) => {
    const test = !playerNames.some((e) => e.playerNumber === index);
    if (test) {
      setPlayerNames(currentState => [...currentState, { playerNumber: index, playerName: value }]);
      // pushes to state instead of replacing it
    } // if the player number isn't in the player names array then add that player number and data to it once it has data entered
    else {
      playerNames?.forEach((player) => {
        if (player.playerNumber === index) {
          player.playerName = value;
        } // if the player number exists in the playerNames array then update the name value once it has data entered
      });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (tournamentType === 'knockout') {
      navigate('/create-knockout', { state: { tournamentTitle, numberOfPlayers, selectedGame, selectedGameLabel, playerNames, eliminationType } });
    }
    else if (tournamentType === 'roundRobin') {
      navigate('/create-round-robin', { state: { tournamentTitle, numberOfPlayers, selectedGame, selectedGameLabel, playerNames, playEachPlayer } });
    }
    setPlayerNames([]);

    // navigate to the respective tournament type creation page when clicking Ok on the Tournament Details Modal
    // Also passes state saved in each of the hooks
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNumberOfPlayers(2);
    setEliminationType('singleElimination');
    setSelectedGame(null);
    setSelectedGameLabel(null);
    setTournamentTitle(null);
    setPlayerNames([]);  // still haven't managed to get the player inputs to clear on cancel of modal
    setPlayEachPlayer(1);
  };

  const handleTitleChange = (event) => {
    setTournamentTitle(event.target.value);
  };

  const handlePlayerNumberSelect = (numberOfPlayers) => {
    setNumberOfPlayers(numberOfPlayers);
  };

  const handleEliminationTypeSelect = (value) => {
    setEliminationType(value);
  };
  const handlePlayEachPlayerSelect = (value) => {
    setPlayEachPlayer(value);
  };

  const handleGameChange = (value) => {
    setSelectedGame(value.value);
    setSelectedGameLabel(value.label[1]); // need to use the 2nd index due to the way labelInValue works
  };

  const handleGameSearch = () => { // need this function even though it contains no logic
  };

  const playerNumberOptions = [];
  for (let i = 2; i <= 32; i++) {
    playerNumberOptions.push({
      label: i,
      i,
    });
  }

  const playerInputs = [];
  const displayPlayerInputs = () => {
    for (let i = 0; i < numberOfPlayers; i++) {
      playerInputs.push(
        <div className='flex-div'>
          {getPlayerAvatar(i)}
          <div className='horizontal-input-align'>
            <Input placeholder='Enter Players Name' className='input-player-name' onChange={(e) => handlePlayerNames(e.target.value, i)} />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className='container'>
        <h1 className='title'>Welcome to Smash Kart Tournament</h1>
        <h2 className='subtitle'>Please select a tournament type</h2>
        <div className='horizontal-align'>

          <button className='button-text' onClick={() => showModal(true, 'knockout')}>
            <p style={{ margin: '5px' }}>Knockout</p>
          </button>

          <button className='button-text' onClick={() => showModal(true, 'roundRobin')}>
            <p style={{ margin: '5px' }}>Round Robin</p>
          </button>
        </div>
      </div>

      <Modal width={700} title="Tournament Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='tournament-details-modal' >
        <div className='input-fields'>
          <Input style={{ textAlign: 'center' }} onChange={handleTitleChange} value={tournamentTitle} placeholder='Enter Tournament Name' />
        </div>
        <div className='centered-div'>
          <h4 style={{ margin: 0 }}>Game:</h4>
          <Select
            showSearch
            value={selectedGame}
            suffixIcon={<SearchOutlined />}
            onChange={handleGameChange}
            onSearch={handleGameSearch}
            style={{ width: '50%' }}
            allowClear
            labelInValue
            placeholder='Search For Game'
            filterOption={(input, option) => option.children[1].toLowerCase().includes(input.toLowerCase())}
          >
            {listOfGames.map((game) => {
              return (
                <Option value={game.value} key={game.value}>
                  <img src={game.icon} style={{ height: '25px', borderRadius: '0.2rem' }} />
                  {game.label}
                </Option>);
            })}
          </Select>
        </div>
        {tournamentType === 'knockout' ?
          <div className='centered-div'>
            <h4 style={{ margin: 0 }}>Elimination Type:</h4>
            <Select value={eliminationType} onChange={handleEliminationTypeSelect} className="select-before">
              <Option value='singleElimination'>Single Elimination</Option>
              <Option value='doubleElimination'>Double Elimination</Option>
            </Select>
          </div>
          :  // if tournamentType is 'roundRobin
          <div className='centered-div'>
            <h4 style={{ margin: 0 }}>Play each player:</h4>
            <Select value={playEachPlayer} onChange={handlePlayEachPlayerSelect} className="select-before">
              <Option value={1}>One Time</Option>
              <Option value={2}>Two Times</Option>
              <Option value={3}>Three Times</Option>
            </Select>
          </div>
        }
        <div className='centered-div'>
          <h4 style={{ margin: 0 }}>Number Of Participants:</h4>
          <Select value={numberOfPlayers} onChange={handlePlayerNumberSelect} className="select-before">
            {playerNumberOptions.map((option) => {
              return (
                <Option value={option.label} key={option.value}>
                  {option.label}
                </Option>);
            })}
          </Select>
        </div>
        {displayPlayerInputs()}
        {playerInputs.map((player) => {
          return player;
        })}
      </Modal>
    </>
  );
};

export default HomePage;