import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MarioKart8Icon from '../icons/MarioKart8Icon.png';
import SmashBrosIcon from '../icons/SSBU_Smash_Ball_Icon.png';
import ChessIcon from '../icons/ChessIcon.png';
import EllipsisIcon from '../icons/EllipsisIcon.png';
import { listOfColours } from '../components/ListOfPlayerColours';


function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tournamentTitle, setTournamentTitle] = useState(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [eliminationType, setEliminationType] = useState('singleElimination');
  const [selectedGame, setSelectedGame] = useState(null);
  const [nameOfPlayers, setNameOfPlayers] = useState([]);
  const [tournamentType, setTournamentType] = useState(null);
  const [playEachPlayer, setPlayEachPlayer] = useState(1);

  const navigate = useNavigate();

  const showModal = (showModal, tournamentType) => {
    setIsModalVisible(showModal);
    setTournamentType(tournamentType);
  };

  let playerNames = [];

  const handlePlayerNames = (value, index) => {
    if (!playerNames.some((e) => e.playerNumber === index)) {
      playerNames.push({ playerNumber: index, playerName: value });
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
      navigate('/create-knockout', { state: { tournamentTitle, numberOfPlayers, eliminationType, selectedGame, playerNames } });
    }
    else if (tournamentType === 'roundRobin') {
      navigate('/create-round-robin', { state: { tournamentTitle, numberOfPlayers, selectedGame, playerNames, playEachPlayer } });
    }

    // navigate to the respective tournament type creation page when clicking Ok on the Tournament Details Modal
    // Also passes state saved in each of the hooks
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNumberOfPlayers(2);
    setEliminationType('singleElimination');
    setSelectedGame(null);
    setTournamentTitle(null);
    // setNameOfPlayers([]);
    playerNames = [];  // still haven't managed to get the player inputs to clear on cancel of modal
    playEachPlayer(1);
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
    setSelectedGame(value);
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
          <Avatar shape='square' size='medium' style={{ backgroundColor: listOfColours[i], borderWidth: '0.5px', border: 'solid', borderColor: 'grey' }} />
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
          {/* </Link> */}
        </div>
      </div>

      <Modal width={700} title="Tournament Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className='tournament-details-modal' >
        <div className='input-fields'>
          <Input style={{ textAlign: 'center' }} onChange={handleTitleChange} value={tournamentTitle} placeholder='Enter Tournament Name' />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0 }}>Game:</h4>
          <Select
            showSearch
            value={selectedGame}
            suffixIcon={<SearchOutlined />}
            onChange={handleGameChange}
            onSearch={handleGameSearch}
            style={{ width: '50%' }}
            allowClear
            placeholder='Search For Game'
            filterOption={(input, option) => option.children[1].toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="marioKart8"><img src={MarioKart8Icon} style={{ height: '25px', borderRadius: '0.2rem' }} /> Mario Kart 8</Option>
            <Option value="superSmashBros"><img src={SmashBrosIcon} style={{ height: '25px', borderRadius: '0.2rem' }} /> Super Smash Bros.</Option>
            <Option value="chessIcon"><img src={ChessIcon} style={{ height: '25px', borderRadius: '0.2rem' }} /> Chess</Option>
            <Option value="other"><img src={EllipsisIcon} style={{ height: '25px', borderRadius: '0.2rem' }} /> Other</Option>
          </Select>
        </div>
        {tournamentType === 'knockout' ?
          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0 }}>Elimination Type:</h4>
            <Select value={eliminationType} onChange={handleEliminationTypeSelect} className="select-before">
              <Option value='singleElimination'>Single Elimination</Option>
              <Option value='doubleElimination'>Double Elimination</Option>
            </Select>
          </div>
          :  // if tournamentType is 'roundRobin
          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0 }}>Play each player:</h4>
            <Select value={playEachPlayer} onChange={handlePlayEachPlayerSelect} className="select-before">
              <Option value={1}>One Time</Option>
              <Option value={2}>Two Times</Option>
              <Option value={3}>Three Times</Option>
            </Select>
          </div>
        }
        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0 }}>Number Of Participants:</h4>
          <Select value={numberOfPlayers} onChange={handlePlayerNumberSelect} className="select-before">
            {playerNumberOptions.map((option) => {
              return <Option value={option.label}>{option.label}</Option>;
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